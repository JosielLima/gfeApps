## Why

A rota raiz (`/`) possui componentes parcialmente implementados (AppHeader, ChallengeCard, Hero, Footer) mas que não refletem o design do Stitch — **"Josiel Lima - Noto Sans Styleguide Portfolio"** (screen `132a3ca4bbcf42189e512589e7d34f4f`, projeto `2319137774723414353`). O design real é um tema **light editorial-brutalist**: fundo branco/neutral-50, fonte única Noto Sans, números gigantes sobrepostos aos cards, bordas grossas 4px, trilha SVG animada e footer invertido (dark sobre página light). Os artefatos anteriores descreviam erroneamente um tema dark neon — isso deve ser corrigido.

## What Changes

- Reescrever `src/routes/index.tsx`: hero com grid-overlay de pontos + layout flex row + SVG da trilha animada + FABs flutuantes
- Redesenhar `src/components/AppHeader.tsx`: `fixed` + `border-b-4 border-on-background` + icon buttons (settings, grid_view) + nav links com hover `bg-primary text-white`
- Redesenhar `src/components/AppFooter.tsx`: dark inverted (`bg-on-background border-t-4 border-primary`), copyright branco, status em `brand-lime`
- Redesenhar `src/components/ChallengeCard.tsx`: número `text-9xl font-black` sobreposto, `border-4 border-on-background/20` → `border-on-background` no hover, badge de dificuldade absolutamente posicionado, card 12 com tratamento dark especial
- Atualizar `src/styles.css`: adicionar aliases semânticos que correspondem ao Tailwind config do Stitch (`--color-on-background`, `--color-background`, `--color-surface`, `--color-outline`, `--color-surface-container`, `--color-surface-variant`, `--color-on-surface-variant`)

## Capabilities

### New Capabilities
- `home-dashboard`: Página inicial com design editorial-brutalist fiel ao Stitch: nav fixa com borda grossa, hero com overlay de pontos e H1 gigante, grade de 12 cards com números sobrepostos e stagger vertical, trilha SVG animada em `#CCFF00`, footer dark invertido, FABs flutuantes

### Modified Capabilities
- `tailwind-theme-tokens`: Adicionar ao `@theme` em `src/styles.css` os aliases semânticos que expõem o vocabulário de design do Stitch como utilities Tailwind (`on-background`, `background`, `surface`, `outline`, `surface-container`, `surface-variant`, `on-surface-variant`)

## Impact

- `src/routes/index.tsx`: reescrita completa
- `src/styles.css`: adição de tokens semânticos no bloco `@theme`
- `src/components/AppHeader.tsx`: redesign completo
- `src/components/AppFooter.tsx`: redesign completo
- `src/components/ChallengeCard.tsx`: redesign completo
- Sem breaking changes em rotas existentes (`/apps/*`)
- Sem novas dependências externas necessárias (Material Symbols Outlined via Google Fonts para os ícones do header/FABs)
