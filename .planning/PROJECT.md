# GFE Apps Track — Challenge 01: Sign in / Sign up

## What This Is

Monorepo de aprendizado que reúne todos os 12 desafios da trilha **Apps** do GreatFrontEnd Projects. Cada desafio tem sua própria rota abaixo de `/apps/` e é acessível pelo dashboard da Home. Este documento cobre o **Desafio 1 — Sign in / Sign up**: implementação completa e manual do fluxo de autenticação com e-mail e senha, incluindo validação client-side/server-side, hashing seguro de senhas e gerenciamento de sessão via cookies HTTP-only.

## Core Value

O usuário consegue criar uma conta e fazer login com segurança real — token de sessão criptograficamente seguro, senha com bcrypt+salt, cookie HTTP-only — e entender cada passo do fluxo internamente.

## Requirements

### Validated

- ✓ TanStack Start + Vite inicializado com SSR — existente
- ✓ TanStack Router file-based com type-safety completa — existente
- ✓ TanStack Query com QueryClient no router context — existente
- ✓ Tailwind CSS v4 com tokens de design em `src/styles.css` — existente
- ✓ Biome configurado (lint + format + organize imports) — existente
- ✓ Vitest + Testing Library configurados — existente
- ✓ Path aliases `@/*` e `#/*` para `src/` — existente

### Active

**Campo de senha**
- [ ] Input de senha mascara caracteres por padrão (`type="password"`)
- [ ] Toggle de visibilidade (ícone olho) com acessibilidade (`aria-label` dinâmico)

**Sign Up — validação client-side**
- [ ] E-mail obrigatório: "O endereço de e-mail é obrigatório." ao submeter vazio
- [ ] Formato de e-mail validado no blur: "Por favor, insira um endereço de e-mail válido."
- [ ] Complexidade de senha em tempo real (8–64 chars, maiúscula, minúscula, número, especial)
- [ ] Ícones de check estado normal/ativo por critério de senha
- [ ] Senha obrigatória no submit: "A senha é obrigatória."
- [ ] Checkbox de Termos obrigatório: toast de erro se não marcado
- [ ] Estados da checkbox: normal, focus, desabilitado × marcado/desmarcado

**Sign Up — validação server-side**
- [ ] Repetir todas as validações acima no servidor
- [ ] Conta já existe: toast "A conta já existe. Fazer login em vez disso?"
- [ ] [Extra] Validação de domínio MX: "Este e-mail não existe."

**Sign In — validação client-side**
- [ ] E-mail e senha obrigatórios no submit

**Sign In — credenciais**
- [ ] Buscar hash+salt do banco pelo e-mail
- [ ] Comparar senha fornecida via bcrypt (mesmo salt)
- [ ] Consulta parametrizada (sem SQL injection)
- [ ] Falha genérica: toast "E-mail ou senha incorretos."

**Gerenciamento de sessão**
- [ ] Token criptograficamente seguro gerado no servidor (`crypto.randomBytes`)
- [ ] Token salvo na tabela `sessions` no SQLite via Prisma
- [ ] Cookie `HttpOnly`, `Secure`, `SameSite=Strict`, com expiração
- [ ] Redirect pós-login via HTTP 302 (server-side)
- [ ] Página de boas-vindas: "Bem-vindo de volta, [email]" via token de sessão

**Armazenamento e segurança**
- [ ] Schema Prisma: tabelas `users` e `sessions`
- [ ] Senha armazenada com bcrypt (salt rounds ≥ 12)
- [ ] E-mails normalizados para lowercase antes de salvar e comparar
- [ ] Variáveis de ambiente: `DATABASE_URL`, `SESSION_SECRET` em `.env` (nunca hard-coded)

**UI / Interatividade**
- [ ] Toast de notificação para erros não específicos de campo
- [ ] Estados de input: normal, preenchido com foco, erro, erro preenchido, erro com foco, desabilitado
- [ ] Estados de button/link: normal, hover, foco, desabilitado
- [ ] Layout responsivo: desktop, tablet, mobile

**Qualidade**
- [ ] Acessibilidade WCAG AA: `aria-describedby` em erros, `aria-live` em toasts, semântica HTML
- [ ] Navegação completa por teclado
- [ ] Cross-browser: Chrome, Firefox, Safari

### Out of Scope

- Design system tokens finais (usuário está desenhando no Google Stitch — será aplicado após conclusão do design)
- Autenticação via serviço externo (OAuth, Clerk, Auth.js) — aprendizado manual é o objetivo
- Redis para sessões — SQLite é suficiente para este escopo de aprendizado
- `framer-motion` para animações — reservado para desafios futuros
- Outros desafios da trilha (2–12) — têm seus próprios documentos de projeto

## Context

**Monorepo:** Este projeto é a coleção completa da trilha Apps do GFE. A Home (`src/routes/index.tsx`) é um dashboard de acesso a cada desafio. O desafio Sign in / Sign up vive em `src/routes/apps/sign-in-sign-up/`.

**Objetivo de aprendizado:** Implementar autenticação manualmente para internalizar cada detalhe do fluxo — nada de magic libraries de auth. O aprendizado acontece na construção, não na configuração de um provider.

**Design:** O usuário é Design Engineer e está projetando a interface no Google Stitch com tokens de DS próprios. A implementação atual deve ser funcional e seguir as diretrizes de acessibilidade; a fidelidade visual será refinada quando o design estiver concluído.

**Pilha já instalada:** TanStack Start / Router / Query, React 19, Tailwind v4, Biome, Vitest, lucide-react. **Precisam ser instalados:** `zod`, `react-hook-form`, `@prisma/client`, `prisma` (dev), `bcryptjs` + `@types/bcryptjs`.

## Constraints

- **Tech Stack:** TanStack Start (sem Next.js, sem Remix) — framework do projeto
- **ORM:** Prisma + SQLite — type-safety + migrations automáticas; não usar better-sqlite3 raw
- **Sessão:** Tokens no banco SQLite + cookie HTTP-only — sem JWT, sem localStorage
- **Validação:** Zod (schemas compartilhados client/server) + React Hook Form
- **Styling:** Tailwind v4 utility-first; tokens em `src/styles.css` dentro de `@theme {}` — sem `tailwind.config.js`
- **Linting:** Biome — sem ESLint/Prettier
- **Testes:** Vitest — funções de validação e hashing devem ter cobertura unitária
- **Segurança:** Variáveis sensíveis em `.env`; nunca hard-code de credenciais

## Key Decisions

| Decisão | Racional | Resultado |
|---------|----------|-----------|
| Prisma + SQLite (não better-sqlite3) | Type-safety nativa + migrations declarativas facilitam aprendizado do schema sem gerenciar SQL raw | — Pending |
| Sessão em banco (não JWT) | JWT auto-contido impede revogação real; tabela `sessions` ensina controle explícito do ciclo de vida | — Pending |
| bcrypt (não Argon2/PBKDF2) | Mais amplamente suportado em Node.js, API simples, suficiente para o objetivo de aprendizado | — Pending |
| Validação com Zod (schema único) | Schema definido uma vez, usado no cliente (React Hook Form) e no servidor (Server Function) — DRY + type-safe | — Pending |
| MX validation no server | Verificação de DNS no lado do cliente expõe a lógica; server-side é mais seguro e correto | — Pending |
| Sem serviço externo de auth | O objetivo explícito é aprender o fluxo internamente | ✓ Decisão final |

## Evolution

Este documento evolui a cada transição de fase e marco de milestone.

**Após cada transição de fase** (via `/gsd:transition`):
1. Requisitos invalidados? → Mover para Out of Scope com motivo
2. Requisitos validados? → Mover para Validated com referência de fase
3. Novos requisitos surgiram? → Adicionar em Active
4. Decisões a registrar? → Adicionar em Key Decisions
5. "What This Is" ainda preciso? → Atualizar se divergiu

**Após cada milestone** (via `/gsd:complete-milestone`):
1. Revisão completa de todas as seções
2. Core Value check — ainda é a prioridade certa?
3. Auditar Out of Scope — motivos ainda válidos?
4. Atualizar Context com estado atual

---
*Last updated: 2026-04-01 após inicialização*
