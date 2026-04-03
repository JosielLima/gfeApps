## 1. Limpeza do design system (src/styles.css)

- [x] 1.1 Remover o import de Plus Jakarta Sans e Manrope da linha `@import url(...)` — manter apenas Noto Sans
- [x] 1.2 Remover as declarações `--font-display` e `--font-body` do bloco `@theme`
- [x] 1.3 Remover o bloco completo de tokens dark "Cartographer's Edge": `--color-surface-*`, `--color-primary*`, `--color-on-surface*`, `--color-outline*`, `--color-error` (#ff7351)
- [x] 1.4 Adicionar `--color-lime-accent: #CCFF00` ao bloco `@theme` após os tokens de borda existentes

## 2. Redesign do AppHeader (src/components/AppHeader.tsx)

- [x] 2.1 Substituir o background escuro por `bg-bg-primary border-b border-border-primary`
- [x] 2.2 Substituir o glassmorphism por `sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-sm`
- [x] 2.3 Estilizar brand: "JOSIEL LIMA" Noto Sans 13px weight 700 uppercase `text-fg-primary`; "GREATFRONT PROJECTS" 10px weight 500 uppercase `text-fg-tertiary`
- [x] 2.4 Estilizar nav links: 13px weight 600 uppercase `text-fg-secondary`, hover `text-fg-primary`, active `text-fg-brand` — reusar a classe `.nav-link` existente do CSS global ou equivalente
- [x] 2.5 Remover o `useEffect` de scroll e o `useState` de glassmorphism — não são mais necessários

## 3. Redesign do AppFooter (src/components/AppFooter.tsx)

- [x] 3.1 Substituir o background dark `bg-surface` por `bg-bg-secondary border-t border-border-primary`
- [x] 3.2 Estilizar texto: Noto Sans 11px weight 500 uppercase `text-fg-tertiary`, `letter-spacing: 0.07em`
- [x] 3.3 Exibir valores de status ("OPERATIONAL", "BRAZIL", "UTC-3") em `text-fg-brand` (`#4338CA`)

## 4. Redesign do ChallengeCard (src/components/ChallengeCard.tsx)

- [x] 4.1 Substituir `bg-surface-container` por `bg-bg-secondary` (`#FAFAFA`) e adicionar `border border-border-primary`
- [x] 4.2 Substituir hover dark (`bg-surface-bright` + glow verde) por `hover:bg-neutral-100 hover:border-border-strong hover:-translate-y-0.5 transition-all duration-150`
- [x] 4.3 Atualizar badge de número: usar `text-fg-tertiary` (sem `text-on-surface-variant`)
- [x] 4.4 Atualizar o `difficultyConfig` com as novas cores por nível:
  - Starter: `bg-lime-accent text-fg-primary`
  - Mid: `bg-brand-50 text-fg-brand`
  - Senior: `bg-violet-100 text-violet-700`
  - Nightmare: `bg-red-100 text-fg-error`
- [x] 4.5 Atualizar título do card: `text-fg-primary` (remover `text-on-surface`)
- [x] 4.6 Atualizar descrição do card: `text-fg-secondary` (remover `text-on-surface-variant`)
- [x] 4.7 Atualizar component tags: `bg-neutral-100 text-fg-tertiary` (remover `bg-surface-container-high`)
- [x] 4.8 Atualizar o `focus-visible`: usar `ring-brand-700` e `ring-offset-white` (remover `ring-primary` e `ring-offset-surface`)

## 5. Redesign da rota Home (src/routes/index.tsx)

- [x] 5.1 Remover o wrapper `min-h-screen bg-surface` — substituir por wrapper sem background (herda o `bg-white` do body)
- [x] 5.2 Redesenhar o hero: background `bg-brand-700` com texto branco, `py-20`, label uppercase "APPS TRACK · 12 CHALLENGES" em 11px weight 700 branco/70, heading h1 "Expedition: Josiel Lima" 40px weight 700 branco, tagline 16px branco/80
- [x] 5.3 Manter o grid de cards com `max-w-[1080px] mx-auto px-4 py-16`, `grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3`
- [x] 5.4 Envolver o grid em `<main>` com `bg-bg-primary` (não precisará de classe explícita — herda o body)

## 6. Qualidade e lint

- [x] 6.1 Rodar `npx biome check --write` nos arquivos modificados para corrigir formatação
- [x] 6.2 Verificar semântica: `<h1>` único na página (hero), `<h2>` nos títulos dos cards, `<nav>` com `aria-label`
- [x] 6.3 Verificar contraste WCAG: branco sobre `#4338CA` no hero (ratio ≥ 4.5:1 ✓), `#171717` sobre `#FAFAFA` nos cards (ratio ≥ 7:1 ✓), `#171717` sobre `#CCFF00` no badge Starter (ratio ≥ 4.5:1 ✓)
