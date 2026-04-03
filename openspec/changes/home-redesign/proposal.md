## Why

A implementação anterior (`nova-home`) usou o tema dark "Cartographer's Edge" extraído dos metadados do projeto Stitch, mas o HTML gerado pelo Stitch para a screen `132a3ca4bbcf42189e512589e7d34f4f` usa o design system existente do projeto — tema claro com indigo (`#4338CA`) como cor brand, lime como acento e Noto Sans. O resultado visual ficou completamente diferente do esperado.

## What Changes

- Reverter `AppHeader` e `AppFooter` para tema claro (branco + indigo), substituindo o esquema dark implementado
- Reescrever `src/routes/index.tsx` com hero indigo, grid de cards em tema claro e footer neutro
- Reverter tokens dark adicionados ao `@theme` de `src/styles.css` (manter apenas os tokens existentes do design system Untitled UI)
- Reverter `__root.tsx` para usar `Header` e `Footer` originais — ou adaptar `AppHeader`/`AppFooter` para o tema claro
- Criar `<ChallengeCard>` alinhado ao design system claro (branco/neutral-50, borda `border-primary`, indigo como cor de ação)
- Adicionar token `--color-lime-accent` (#CCFF00) ao `@theme` para os badges de dificuldade

## Capabilities

### New Capabilities
- `home-dashboard-light`: Home page com tema claro usando o design system existente (indigo + lime + Noto Sans), com hero indigo, grid de 12 cards em neutral e footer neutro — alinhada ao HTML gerado pelo Stitch

### Modified Capabilities
- `tailwind-theme-tokens`: Remover tokens dark "Cartographer's Edge" que foram adicionados indevidamente; adicionar apenas o token `--color-lime-accent` necessário para os badges da home

## Impact

- `src/styles.css`: Remover bloco de tokens dark, adicionar `--color-lime-accent`
- `src/components/AppHeader.tsx`: Redesign completo para tema claro
- `src/components/AppFooter.tsx`: Redesign completo para tema claro
- `src/components/ChallengeCard.tsx`: Redesign para tema claro com tokens existentes
- `src/routes/index.tsx`: Reescrever com hero indigo + cards neutros
- Sem breaking changes nas rotas `/apps/*` (tokens existentes preservados)
- Remover fontes Plus Jakarta Sans e Manrope do import (não utilizadas após o redesign)
