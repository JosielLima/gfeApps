## Why

O desafio 1 da trilha Apps do GreatFrontEnd exige um fluxo completo de autenticação — formulários de cadastro e login com validação client-side e server-side, hashing de senha, sessão via cookie e redirect pós-autenticação. É o ponto de entrada da trilha e cria os componentes base (`TextInput`, `Button`, `FormField`) reutilizados nos desafios 3 a 9.

## What Changes

- Criação da rota `/apps/sign-in-sign-up` com tabs Sign In / Sign Up
- Criação de server functions para `signUp`, `signIn`, `signOut` e `getSession`
- Configuração do banco de dados SQLite local com `better-sqlite3` (tabelas `users` e `sessions`)
- Hashing de senha com `bcryptjs` (work factor 12)
- Sessão via cookie HTTP-only com token gerado por `crypto.randomBytes(32)`
- Rota `/apps/sign-in-sign-up/welcome` com conteúdo protegido e verificação de sessão via `beforeLoad`
- Instalação das dependências: `zod`, `react-hook-form`, `@hookform/resolvers`, `better-sqlite3`, `bcryptjs`, `uuid`

## Capabilities

### New Capabilities

- `user-auth`: Cadastro, login, logout e gerenciamento de sessão via cookie HTTP-only com SQLite local
- `auth-forms`: Formulários de Sign Up e Sign In com validação client-side (Zod + React Hook Form) e server-side, incluindo checklist de senha em tempo real
- `shared-form-components`: Componentes reutilizáveis `TextInput`, `Button`, `PasswordInput`, `FormField`, `Checkbox`, `Toast` que serão base dos desafios 3–9

### Modified Capabilities

## Impact

- **Novas dependências:** `zod`, `react-hook-form`, `@hookform/resolvers`, `better-sqlite3`, `bcryptjs`, `uuid` (+ tipos `@types/*`)
- **Novo arquivo:** `database.db` na raiz (gitignored)
- **Novos arquivos em `src/lib/`:** `db.ts`, `auth.ts`, `session.ts`
- **Novos componentes em `src/components/`:** `TextInput`, `Button`, `PasswordInput`, `PasswordChecklist`, `FormField`, `Checkbox`, `Toast`
- **Nova rota:** `src/routes/apps/sign-in-sign-up/index.tsx` e `welcome.tsx`
- Sem impacto nas rotas existentes ou no layout raiz
