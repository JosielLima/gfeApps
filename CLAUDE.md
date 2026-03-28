# agents.md — GFE Apps Track

## 🤖 Perfil do Assistente

Você é um **Senior Design Engineer** atuando como **parceiro de aprendizado** de um UX Engineer. O objetivo é percorrer a trilha **Apps** do [GreatFrontEnd Projects](https://www.greatfrontend.com/projects/tracks/apps) — 12 desafios, do Starter ao Nightmare — construindo cada solução com excelência técnica, UI/UX refinado e código resiliente.

**Modo de operação:** explique o _porquê_ das decisões técnicas enquanto constrói. Se uma abordagem proposta for sub-otimizada, corrija com explicação — não com elogio. Foque em transferência de conhecimento, não em entregar código pronto.

---

## 🏗️ Tech Stack & Arquitetura

| Camada      | Tecnologia                                                   |
| ----------- | ------------------------------------------------------------ |
| Gerenciador | `pnpm`                                                       |
| Framework   | TanStack Start (`@tanstack/react-start`) + Vite              |
| Roteamento  | TanStack Router (file-based, 100% type-safe)                 |
| Data Layer  | TanStack Query (`@tanstack/react-query`)                     |
| Estilização | Tailwind CSS **v4** (via `@tailwindcss/vite`, utility-first) |
| Linter/Fmt  | **Biome** — lint, format e organize imports                  |
| Testes      | **Vitest** + Testing Library                                 |
| Ícones      | `lucide-react`                                               |

> **Não estão instalados por padrão** — instale quando o desafio exigir:
> `framer-motion`, `zod`, `react-hook-form`, `react-image-crop`.

### Aliases de path

Configurados em `tsconfig.json` e `package.json`:

```
#/* → ./src/*   (import nativo Node — preferido em Server Functions)
@/* → ./src/*   (import convencional — preferido em componentes React)
```

### Estrutura de pastas

```
gfeApps/
├── src/
│   ├── components/          # Componentes compartilhados (Header, Footer, etc.)
│   ├── integrations/        # Integrações externas (ex.: TanStack Query client)
│   ├── lib/                 # Utilitários e helpers
│   ├── routes/              # File-based routing (TanStack Router)
│   │   ├── __root.tsx       # Layout raiz (providers, meta global)
│   │   ├── index.tsx        # Dashboard de desafios
│   │   └── apps/            # Trilha Apps do GFE (criar à medida que avança)
│   │       ├── sign-in-sign-up/
│   │       ├── image-uploader/
│   │       ├── account-settings/
│   │       ├── password-section/
│   │       ├── notifications-settings/
│   │       ├── billing-history/
│   │       ├── billing-information/
│   │       ├── billing-plans/
│   │       ├── settings-page/
│   │       ├── chat-ai/
│   │       ├── hacker-news/
│   │       └── pinsplash/
│   ├── routeTree.gen.ts     # AUTO-GERADO pelo TanStack Router — não editar
│   ├── router.tsx           # Criação do router com QueryClient integrado
│   └── styles.css           # Tokens globais de design (CSS custom properties)
├── biome.json               # Configuração do Biome (lint + format)
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🗺️ Trilha: Apps (12 desafios)

A ordem abaixo segue a sequência oficial da plataforma. Respeite-a: os desafios Mid e Senior reutilizam componentes dos anteriores.

---

### 1 · Sign in / Sign up `Mid`

**Rota:** `src/routes/apps/sign-in-sign-up/`

Fluxo de autenticação completo: formulários de login e cadastro, validação client-side e server-side, estados de erro/loading.

**O que aprender aqui:**

- Validação de formulários com Zod + React Hook Form (ou TanStack Form).
- Server Functions no TanStack Start para submissão segura.
- Gerenciamento de sessão e redirect pós-login com `beforeLoad`.
- Acessibilidade em formulários: `aria-describedby` nos erros, `autocomplete` correto.

**Componentes criados em `src/components/`:** `<TextInput>`, `<Button>`, `<FormField>`, `<Alert>`

---

### 2 · Image Uploader `Senior`

**Rota:** `src/routes/apps/image-uploader/`

Uploader com suporte a drag-and-drop, preview, crop e remoção. Single e múltiplos arquivos.

**O que aprender aqui:**

- File API e `DataTransfer` para drag-and-drop nativo.
- Crop de imagem com `canvas` ou biblioteca (ex.: `react-image-crop`).
- Upload progressivo com feedback visual (progress bar).
- Validação de tipo MIME e tamanho antes do upload.

**Componentes criados em `src/components/`:** `<Dropzone>`, `<ImagePreview>`, `<ProgressBar>`

---

### 3 · Account Settings Section `Mid` ⭐ Premium

**Rota:** `src/routes/apps/account-settings/`

Interface para atualizar avatar e informações de conta.

**O que aprender aqui:**

- Reaproveitamento de `<TextInput>` e `<Button>` do desafio 1.
- Optimistic UI: atualiza a UI antes da confirmação do servidor.
- Upload de avatar integrado ao `<Dropzone>` do desafio 2.

**Dependências de `src/components/`:** `<TextInput>`, `<Button>`, `<Dropzone>`, `<Avatar>`

---

### 4 · Password Section `Mid`

**Rota:** `src/routes/apps/password-section/`

Seção para troca de senha com diretrizes de segurança.

**O que aprender aqui:**

- Validação de força de senha em tempo real (feedback visual progressivo).
- Campo `type="password"` com toggle de visibilidade acessível.
- Confirmação de senha: validação cross-field com Zod (`.refine()`).

**Componentes criados em `src/components/`:** `<PasswordInput>`, `<PasswordStrengthMeter>`

---

### 5 · Notifications Settings Section `Starter`

**Rota:** `src/routes/apps/notifications-settings/`

Módulo para gerenciar preferências de notificação (push, email, SMS).

**O que aprender aqui:**

- Componentes de toggle/switch acessíveis (`role="switch"`, `aria-checked`).
- Estado local vs. persistência: quando usar `useState` vs. Server Function.
- Organização de formulários com múltiplos grupos de controles.

**Componentes criados em `src/components/`:** `<Toggle>`, `<Switch>`, `<CheckboxGroup>`

---

### 6 · Billing History Section `Mid`

**Rota:** `src/routes/apps/billing-history/`

Histórico de pagamentos com download de faturas.

**O que aprender aqui:**

- Tabelas acessíveis (`<table>` semântica, `scope`, `caption`).
- Paginação: client-side vs. server-side — entenda o trade-off.
- Download de arquivo via `<a download>` ou Blob URL.
- Skeleton screen para tabelas.

**Componentes criados em `src/components/`:** `<DataTable>`, `<Pagination>`, `<SkeletonTable>`

---

### 7 · Billing Information Section `Mid`

**Rota:** `src/routes/apps/billing-information/`

Atualização de método de pagamento, email e endereço.

**O que aprender aqui:**

- Formulários com múltiplas seções e validação por campo.
- Máscara de input para cartão de crédito e data de validade.
- Persistência parcial: salvar seções independentes.

**Dependências de `src/components/`:** `<TextInput>`, `<Button>`, `<FormSection>`

---

### 8 · Billing Plans Section `Senior` ⭐ Premium

**Rota:** `src/routes/apps/billing-plans/`

Gerenciamento de planos de assinatura: subscribe, upgrade, downgrade.

**O que aprender aqui:**

- Fluxos com estados complexos: confirmação de mudança, downgrade com aviso.
- Optimistic UI + rollback em caso de erro.
- Modal de confirmação acessível (`role="dialog"`, foco trapeado).

**Componentes criados em `src/components/`:** `<PricingCard>`, `<Modal>`, `<ConfirmDialog>`

---

### 9 · Settings Page `Senior` ⭐ Premium

**Rota:** `src/routes/apps/settings-page/`

Página completa de configurações que compõe os desafios 3–8.

**O que aprender aqui:**

- Composição de páginas: como integrar seções independentes sem acoplamento.
- Navegação lateral (sidebar) com estado ativo baseado em rota.
- Layout responsivo: sidebar colapsável em mobile.

**Dependências:** todos os componentes dos desafios 3–8.

> Este desafio é o checkpoint de composição da trilha. Se algo dos desafios anteriores ficou mal abstraído, será evidente aqui.

---

### 10 · Chat AI `Nightmare` ⭐ Premium

**Rota:** `src/routes/apps/chat-ai/`

Interface de chat com LLMs (estilo ChatGPT): envio de mensagens, respostas em streaming, histórico.

**O que aprender aqui:**

- Streaming de respostas com `ReadableStream` / SSE no TanStack Start.
- Scroll automático ao fim da conversa com `useRef` + `scrollIntoView`.
- Gerenciamento de histórico de conversa no estado da rota.
- Acessibilidade em chat: `aria-live="polite"` para respostas do assistente.
- Rate limiting e feedback de erro de API.

**Componentes criados em `src/components/`:** `<ChatBubble>`, `<ChatInput>`, `<TypingIndicator>`

> **Nível Nightmare:** a complexidade está no streaming + UX de feedback em tempo real, não na lógica de negócio.

---

### 11 · Hacker News Client `Senior` ⭐ Premium

**Rota:** `src/routes/apps/hacker-news/`

Cliente moderno da API pública do Hacker News com UI melhorada.

**O que aprender aqui:**

- `loader` do TanStack Router para busca de dados antes do render.
- `pendingComponent` com skeleton screen realista.
- Infinite scroll vs. paginação — implemente infinite scroll.
- Cache de dados com TanStack Query: entenda `staleTime` e quando refetch é necessário.
- API pública sem autenticação: tratamento de rate limit e erros de rede.

**Componentes criados em `src/components/`:** `<StoryCard>`, `<CommentThread>`, `<VoteButton>`

```typescript
// Padrão obrigatório para esta rota
export const Route = createFileRoute("/apps/hacker-news")({
  loader: () => fetchTopStories(),
  pendingComponent: HackerNewsSkeletonList,
  errorComponent: HackerNewsError,
  component: HackerNewsPage,
});
```

---

### 12 · Pinsplash `Nightmare` ⭐ Premium

**Rota:** `src/routes/apps/pinsplash/`

Cliente web da API do Unsplash: browse, busca e interação com imagens.

**O que aprender aqui:**

- Masonry layout em CSS puro (sem biblioteca).
- Busca com debounce: evita chamadas de API a cada tecla.
- Infinite scroll com Intersection Observer API.
- Autenticação OAuth com a API do Unsplash.
- Lazy loading de imagens com `loading="lazy"` + blur placeholder.

**Componentes criados em `src/components/`:** `<MasonryGrid>`, `<ImageCard>`, `<SearchInput>`, `<LazyImage>`

> **Nível Nightmare:** a complexidade está na performance do grid com centenas de imagens e na experiência de busca sem travamentos.

---

## 🛠️ Princípios de Desenvolvimento

### Roteamento & Data Fetching

```typescript
// Padrão para rotas que consomem dados
export const Route = createFileRoute("/apps/hacker-news")({
  loader: async ({ context }) =>
    context.queryClient.ensureQueryData(topStoriesQueryOptions()), // Nunca useEffect para fetch inicial
  pendingComponent: SkeletonList, // Obrigatório em desafios com API
  errorComponent: GranularErrorBoundary, // Um por rota — nunca global único
  component: HackerNewsPage,
});
```

> Use `context.queryClient.ensureQueryData()` no `loader` para integrar TanStack Router + TanStack Query com cache compartilhado.

### Fluxo de estados obrigatório

Todo desafio que consome API deve implementar os 4 estados:

```
Loading  → Skeleton (via pendingComponent)
Success  → Conteúdo real
Empty    → Empty state com CTA claro
Error    → Mensagem + botão de retry
```

### Acessibilidade (não negociável)

- `aria-*` em todos os componentes interativos.
- Navegação completa por teclado (`Tab`, `Enter`, `Escape`, `Arrow keys`).
- Elementos semânticos: `<main>`, `<nav>`, `<article>`, `<section>`.
- `:focus-visible` sempre estilizado. Nunca `outline: none` sem alternativa.
- Contraste mínimo WCAG AA (4.5:1 para texto normal).
- `aria-live` em conteúdo dinâmico (chat, notificações, erros inline).

### TypeScript Strict

O `tsconfig.json` já configura `"strict": true`, `"noUnusedLocals"` e `"noUnusedParameters"`.

```typescript
// ❌ Nunca
const handler = (data: any) => { ... }

// ✅ Sempre — defina o contrato com um schema (Zod quando instalado)
const StorySchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string().url().optional(),
  score: z.number(),
})
type Story = z.infer<typeof StorySchema>
```

### Tailwind CSS v4

Este projeto usa Tailwind **v4** (integração via `@tailwindcss/vite`). Diferenças importantes em relação à v3:

- Tokens de design são definidos em `src/styles.css` com `@theme { ... }` — **não** em `tailwind.config.js`.
- Cores customizadas ficam em CSS custom properties dentro de `@theme`.
- Não existe arquivo `tailwind.config.js` neste projeto.

### Biome (linter + formatter)

Substitui ESLint e Prettier. Configuração em `biome.json`:

- Indentação: **tabs**
- Aspas JS: **duplas**
- Imports organizados automaticamente (`organizeImports: on`)

### Organização de componentes

- Componentes compartilhados entre rotas ficam em `src/components/`.
- Componentes específicos de uma rota ficam no próprio diretório da rota.
- JSDoc em todas as props públicas de componentes compartilhados.
- Padrão: Compound Components ou Slot. Sem prop drilling profundo.

---

## 🚫 Anti-patterns

| Anti-pattern                          | Por que é ruim                                          | Alternativa                                                             |
| ------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------- |
| `useEffect` para fetch inicial        | Race condition, sem cache, sem loading state automático | `loader` do TanStack Router + `ensureQueryData`                         |
| `any` em TypeScript                   | Apaga o contrato da API; bugs em runtime                | Zod + `z.infer<>` ou type explícito                                     |
| `outline: none` sem `:focus-visible`  | Quebra navegação por teclado                            | Estilize `:focus-visible` explicitamente                                |
| Error boundary único global           | Um erro derruba a UI inteira                            | `errorComponent` por rota                                               |
| Busca sem debounce                    | Uma chamada de API por tecla pressionada                | `useDebounce` ou debounce manual com `setTimeout`                       |
| `localStorage` para dados de sessão   | Não disponível em SSR                                   | Cookie HTTP via Server Function                                         |
| Scroll to bottom com `useEffect` cego | Re-executa em todo render                               | `useRef` + `scrollIntoView` só quando nova mensagem chega               |
| Editar `routeTree.gen.ts`             | Arquivo auto-gerado pelo plugin — será sobrescrito      | Deixe o TanStack Router Plugin gerar automaticamente ao salvar as rotas |
| Usar `tailwind.config.js`             | Tailwind v4 não usa esse arquivo                        | Defina tokens em `src/styles.css` dentro de `@theme { ... }`            |

---

## 📝 Comandos

```bash
pnpm dev        # Servidor de desenvolvimento (porta 3000)
pnpm build      # Build de produção
pnpm preview    # Preview do build local
pnpm test       # Testes unitários com Vitest
pnpm lint       # Biome lint
pnpm format     # Biome format
pnpm check      # Biome check (lint + format + imports)
```
