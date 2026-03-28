# Design: Sign In / Sign Up — Decisão de Arquitetura

**Data:** 2026-03-28
**Desafio:** 01 · Sign in / Sign up `Mid`
**Spec de referência:** `specs/01-sign-in-sign-up.spec.md`

---

## Contexto

O desafio exige um fluxo completo de autenticação: formulários de cadastro e login com validação client-side e server-side, hashing de senha, gerenciamento de sessão via cookie e redirect pós-autenticação.

A pergunta central foi: **precisamos de um backend separado, BFF ou pasta de projeto externa?**

**Resposta: não.** O TanStack Start é um framework full-stack. Suas *server functions* executam no processo Node.js do servidor e têm acesso a banco de dados, filesystem, variáveis de ambiente e headers HTTP — elas *são* o backend.

---

## Decisões de Arquitetura

### 1. Sem backend separado

Não há Express, Fastify, BFF ou pasta de projeto separada. Toda a lógica server-side vive em server functions dentro de `src/routes/apps/sign-in-sign-up/`.

```
gfeApps/              ← único projeto, única porta (3000)
├── src/
│   ├── lib/
│   │   ├── db.ts           # instância singleton do better-sqlite3
│   │   ├── auth.ts         # server functions: signUp, signIn, signOut
│   │   └── session.ts      # server function: getSession
│   └── routes/
│       └── apps/
│           └── sign-in-sign-up/
│               └── index.tsx   # componente de página (UI)
```

Server functions ficam em `src/lib/` porque são utilitários de negócio reutilizáveis — não pertencem ao diretório de rotas. O TanStack Router só processa arquivos dentro de `src/routes/` que seguem seu padrão de nomenclatura; arquivos em `src/lib/` nunca geram rotas.

### 2. Banco de dados: SQLite local com `better-sqlite3`

Um único arquivo `database.db` na raiz do projeto. API síncrona, zero serviço externo, zero conta.

**Por quê SQLite e não outra opção:**

| Opção | Persistência | Setup | Reutilizável nos próximos desafios | Deploy |
|---|---|---|---|---|
| **SQLite local** ✅ | Sim | Zero | Sim (desafios 3–9) | Requer adaptação |
| Turso (cloud SQLite) | Sim | Conta + env vars | Sim | Nativo |
| In-memory Map | Não (reset ao reiniciar) | Zero | Não | — |
| TanStack DB | ❌ client-side apenas | — | — | — |

O banco persiste entre reinicializações do servidor. O arquivo `database.db` é adicionado ao `.gitignore`.

**Schema inicial:**

```sql
CREATE TABLE users (
  id         TEXT PRIMARY KEY,       -- UUID v4
  email      TEXT UNIQUE NOT NULL,   -- lowercase, normalizado
  password   TEXT NOT NULL,          -- hash bcrypt ($2b$12$...)
  created_at INTEGER NOT NULL        -- Unix timestamp
);

CREATE TABLE sessions (
  id         TEXT PRIMARY KEY,       -- token criptograficamente seguro (32 bytes hex)
  user_id    TEXT NOT NULL REFERENCES users(id),
  expires_at INTEGER NOT NULL        -- Unix timestamp
);
```

### 3. TanStack DB — não aplicável aqui

TanStack DB é um store reativo *client-side* (browser). Não tem primitivas de servidor, não armazena dados entre sessões de usuários diferentes, e usar credenciais no cliente é uma falha de segurança por design. Descartado.

### 4. Hashing de senha: `bcrypt`

Algoritmo adaptável com salt automático. Work factor 12 (padrão seguro para 2026).

```ts
// Cadastro
const hash = await bcrypt.hash(password, 12)

// Login
const valid = await bcrypt.compare(providedPassword, storedHash)
```

### 5. Sessão via cookie HTTP-only

O token de sessão é gerado com `crypto.randomBytes(32).toString('hex')` e armazenado na tabela `sessions`. O cookie é configurado com:

```
HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800
```

Nenhum dado de sessão no `localStorage` — inacessível a JavaScript do cliente, protegido contra XSS.

### 6. APIs externas nos desafios futuros

O mesmo padrão se aplica nos desafios Nightmare (Chat AI, Hacker News, Pinsplash): a server function chama a API externa com a chave de API disponível apenas no servidor (`process.env.OPENAI_API_KEY`, etc.), nunca exposta ao bundle do cliente.

---

## Estrutura de arquivos resultante

```
gfeApps/
├── database.db                           ← gitignored, criado no primeiro run
├── src/
│   ├── components/
│   │   ├── TextInput.tsx                 ← novo: input com estados de erro
│   │   ├── Button.tsx                    ← novo: variantes + estados
│   │   ├── PasswordInput.tsx             ← novo: toggle de visibilidade
│   │   ├── PasswordChecklist.tsx         ← novo: checklist de complexidade em tempo real
│   │   ├── FormField.tsx                 ← novo: wrapper com label + mensagem de erro
│   │   ├── Checkbox.tsx                  ← novo: estados normal/foco/disabled
│   │   └── Toast.tsx                     ← novo: notificação de erro não-específica de campo
│   ├── lib/
│   │   ├── db.ts                         ← novo: instância singleton do better-sqlite3
│   │   ├── auth.ts                       ← novo: server functions signUp, signIn, signOut
│   │   └── session.ts                    ← novo: server function getSession
│   └── routes/
│       └── apps/
│           └── sign-in-sign-up/
│               └── index.tsx             ← página com tabs Sign In / Sign Up
```

---

## Fluxo de dados

### Sign Up

```
[Form] → onSubmit
  → validação client-side (Zod)
  → se inválido: erros inline nos campos
  → se válido: chama server function signUp(email, password)
    → server: normaliza email (lowercase)
    → server: valida novamente (Zod)
    → server: verifica se email já existe → toast "Account already exists. Sign in instead?"
    → server: bcrypt.hash(password, 12)
    → server: INSERT INTO users
    → server: cria session token → INSERT INTO sessions
    → server: Set-Cookie + HTTP 302 → /apps/sign-in-sign-up/welcome
```

### Sign In

```
[Form] → onSubmit
  → validação client-side (campos não vazios)
  → chama server function signIn(email, password)
    → server: busca user pelo email
    → server: bcrypt.compare(password, hash)
    → server: se falhar → toast genérico "Incorrect email or password." (sem revelar se conta existe)
    → server: se passar → cria session token → INSERT INTO sessions
    → server: Set-Cookie + HTTP 302 → /apps/sign-in-sign-up/welcome
```

### Verificação de sessão (beforeLoad)

```
Route beforeLoad
  → chama getSession() (lê cookie)
  → se sessão válida → passa user para contexto da rota
  → se não → redirect para /apps/sign-in-sign-up
```

---

## Validação client-side

| Campo | Trigger | Regra | Mensagem |
|---|---|---|---|
| Email (sign up) | submit | não vazio | "O endereço de e-mail é obrigatório." |
| Email (sign up) | blur | formato válido | "Por favor, insira um endereço de e-mail válido." |
| Senha (sign up) | tempo real | 8–64 chars | checklist visual |
| Senha (sign up) | tempo real | maiúscula | checklist visual |
| Senha (sign up) | tempo real | minúscula | checklist visual |
| Senha (sign up) | tempo real | número | checklist visual |
| Senha (sign up) | tempo real | caractere especial | checklist visual |
| Senha (sign up) | submit | não vazia | "A senha é obrigatória." |
| Checkbox ToS | submit | marcado | toast: "Você deve concordar com os Termos de Serviço..." |
| Email (sign in) | submit | não vazio | "O e-mail é obrigatório." |
| Senha (sign in) | submit | não vazia | "A senha é obrigatória." |

---

## Dependências a instalar

```bash
pnpm add better-sqlite3 bcryptjs uuid
pnpm add -D @types/better-sqlite3 @types/bcryptjs @types/uuid
pnpm add zod react-hook-form @hookform/resolvers
```

> `zod` e `react-hook-form` serão reutilizados nos desafios 4 (Password Section), 7 (Billing Information) e outros. Instalar agora é a decisão correta.

---

## O que este desafio ensina (e por quê importa)

- **Server Functions do TanStack Start:** como expor lógica server-side sem criar uma API REST separada.
- **Segurança de autenticação:** hashing com bcrypt, cookies HTTP-only, mensagens de erro genéricas anti-enumeration.
- **Validação em duas camadas:** client-side para UX rápida, server-side como camada de segurança obrigatória.
- **Gerenciamento de sessão:** tokens criptograficamente seguros, expiração, limpeza.
- **Componentes reutilizáveis:** `TextInput`, `Button`, `FormField` serão a base dos desafios 3–9.

---

## Fora do escopo neste desafio

- Validação de registro MX de domínio de e-mail (marcado como `[Meta extra]` na spec)
- Reset de senha / "esqueci minha senha"
- OAuth / login social
- Rate limiting por IP
- Email de confirmação de cadastro
