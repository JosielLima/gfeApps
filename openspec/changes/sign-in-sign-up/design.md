## Context

O TanStack Start é um framework full-stack — suas server functions executam no processo Node.js do servidor com acesso a banco de dados, filesystem, variáveis de ambiente e headers HTTP. Não há necessidade de backend separado.

A trilha tem 12 desafios. O schema de dados é pequeno (~3 tabelas no total entre todos os desafios), e os componentes criados aqui (`TextInput`, `Button`, `FormField`) serão reutilizados nos desafios 3–9.

## Goals / Non-Goals

**Goals:**
- Implementar cadastro e login com validação em duas camadas (client + server)
- Sessão segura via cookie HTTP-only com token aleatório
- Hashing de senha com bcrypt (work factor 12)
- Componentes de formulário reutilizáveis para os desafios futuros
- Schema de banco compatível com extensão nos desafios 3–9

**Non-Goals:**
- OAuth / login social
- Reset de senha
- Rate limiting por IP
- Email de confirmação de cadastro
- Validação de registro MX de domínio
- Backend separado, BFF ou Express/Fastify

## Decisions

### 1. Sem backend separado — TanStack Start server functions

Toda lógica server-side vive em `src/lib/` como server functions. O TanStack Start lida com o boundary client/server automaticamente via `'use server'`.

**Alternativas consideradas:**
- Express separado: overhead de CORS, dois processos, dois deploys — desnecessário para este contexto
- API Routes estilo Next.js: TanStack Start usa server functions, não file-based API routes — o padrão correto aqui é `createServerFn()`

### 2. Banco de dados: SQLite local com `better-sqlite3`

Um único arquivo `database.db` na raiz. API síncrona, zero serviço externo.

**Por que não Prisma:**
O schema tem 2 tabelas e ~5 queries no total. Prisma adicionaria `prisma generate`, `prisma migrate dev` e um layer de abstração desnecessário para esse volume. O custo cognitivo extra não se paga em 12 desafios com schema estável e pequeno.

**Por que não in-memory Map:**
Não persiste entre reinicializações. Inviável para testar fluxo completo.

**Por que não Turso (cloud SQLite):**
Requer conta + env vars + conexão de rede. Adiciona dependência externa desnecessária para desenvolvimento local.

### 3. Hashing de senha: `bcryptjs`

Work factor 12 — balanceia segurança e tempo de resposta (~300ms em hardware moderno, defensável contra brute-force).

Salt automático por design do bcrypt. Nenhuma lógica de salt manual necessária.

**Por que não Argon2:** Requer compilação nativa (como `better-sqlite3` já tem). Adicionar um segundo módulo nativo sem ganho prático para este contexto não se justifica.

### 4. Sessão via cookie HTTP-only

Token gerado com `crypto.randomBytes(32).toString('hex')` — 256 bits de entropia, criptograficamente seguro. Armazenado na tabela `sessions` com `expires_at`.

Atributos do cookie:
```
HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800
```

**Por que não JWT:** JWT stateless impossibilita invalidação de sessão (logout, rotação de token). Para um sistema de auth real, sessão server-side é o padrão correto.

**Por que não localStorage:** Inacessível via `HttpOnly` cookie é intencional — protege contra XSS. `localStorage` não tem essa proteção.

### 5. Validação em duas camadas com Zod

Client-side via React Hook Form + `@hookform/resolvers/zod` — UX rápida sem round-trip.
Server-side com o mesmo schema Zod — garantia de segurança independente do cliente.

O schema Zod é definido uma vez em `src/lib/auth.ts` e importado tanto no componente quanto na server function.

### 6. Mensagem de erro genérica no Sign In

O erro de autenticação falha retorna sempre `"E-mail ou senha incorretos."` — independente de o e-mail existir ou não. Isso previne user enumeration attacks (saber quais e-mails estão cadastrados sem autenticar).

## Risks / Trade-offs

- **SQLite não escala horizontalmente** → Aceitável: é ambiente de desenvolvimento local. Em produção real, migrar para Turso ou Postgres é direto com o mesmo schema.
- **`better-sqlite3` requer compilação nativa** → Risco de incompatibilidade em alguns ambientes. Mitigação: usar a versão exata do Node.js recomendada pelo projeto.
- **Work factor 12 do bcrypt adiciona ~300ms no login** → Comportamento esperado e desejável. Comunicar via estado de loading no botão.
- **Cookie `Secure` requer HTTPS** → Em desenvolvimento local (HTTP), o atributo `Secure` pode ser omitido condicionalmente via `process.env.NODE_ENV !== 'production'`.
