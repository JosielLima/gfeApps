## 1. Tokens & Utilitários CSS (src/styles.css)

- [x] 1.1 Adicionar import de `Material Symbols Outlined` ao Google Fonts já existente em `styles.css` (ou em `__root.tsx` no `<head>`): `family=Material+Symbols+Outlined:wght,FILL@100..700,0..1`
- [x] 1.2 Adicionar no bloco `@theme` os tokens do vocabulário Stitch:
  - `--color-on-background: #171717`
  - `--color-background: #FAFAFA`
  - `--color-surface: #FFFFFF`
  - `--color-surface-container: #F5F5F5`
  - `--color-surface-variant: #E5E5E5`
  - `--color-on-surface-variant: #525252`
  - `--color-outline: #A3A3A3`
  - `--color-primary: #4338CA` (alias direto para `var(--color-brand-700)`)
- [x] 1.3 Adicionar fora do `@theme` as classes utilitárias necessárias:
  - `.grid-overlay` (radial-gradient dots, opacity 0.1)
  - `.stagger-1`, `.stagger-2`, `.stagger-3` (margin-top 0 / 4rem / 8rem)
  - `@keyframes dash` + `.treasure-path` (stroke-dasharray animation)
  - `.tabular-nums` (font-variant-numeric: tabular-nums)
  - `.material-symbols-outlined` (font-variation-settings)

## 2. Componente AppHeader (src/components/AppHeader.tsx)

- [x] 2.1 Alterar o elemento raiz de `<header>` para `<nav>` com classes: `fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b-4 border-on-background`
- [x] 2.2 Adicionar layout interno: `flex justify-between items-center px-6 py-4`
- [x] 2.3 Atualizar branding: `<div class="font-black text-xl tracking-tighter text-on-background">JOSIEL LIMA</div>`
- [x] 2.4 Atualizar nav links com as classes do Stitch: `uppercase tracking-widest text-[11px] font-bold hover:bg-primary hover:text-white px-2 py-1 transition-colors duration-200`
- [x] 2.5 Link ativo (CHALLENGES): adicionar `text-primary font-black` quando na rota `/`
- [x] 2.6 Adicionar icon buttons à direita dos links: settings e grid_view usando `<span class="material-symbols-outlined">` com `scale-95 active:scale-90 focus-visible:ring-2 focus-visible:ring-primary outline-none cursor-pointer`
- [x] 2.7 Ocultar nav links em mobile (`hidden md:flex gap-6`) mas manter icon buttons visíveis

## 3. Seção Hero (src/routes/index.tsx)

- [x] 3.1 Substituir a `<section>` atual por `<header aria-labelledby="hero-heading" class="relative pt-32 pb-20 px-6 md:px-20 overflow-hidden">`
- [x] 3.2 Adicionar `<div class="absolute inset-0 grid-overlay" aria-hidden="true" />` como primeiro filho
- [x] 3.3 Implementar layout flex: `<div class="relative z-10 flex flex-col md:flex-row items-end justify-between gap-8">`
- [x] 3.4 Bloco esquerdo: `<p>` eyebrow "Expedition: Josiel Lima" + `<h1 id="hero-heading" class="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] text-on-background">GREATFRONT PROJECTS <br/><span class="text-outline uppercase">Component Tracks App</span></h1>`
- [x] 3.5 Bloco direito (desktop): descrição `text-[10px] uppercase tracking-[0.2em] font-bold text-right border-l-4 border-on-background pl-6 max-w-xs leading-relaxed` com o texto "Mapping the technical landscape through brutalist iteration. Each node represents a leap in UI complexity."

## 4. Grid de Cards com SVG Trail (src/routes/index.tsx)

- [x] 4.1 Substituir `<main>` atual por `<main class="relative px-6 md:px-20 pb-40">`
- [x] 4.2 Adicionar SVG trail como primeiro filho do `<main>`: `<div aria-hidden="true" class="absolute inset-0 pointer-events-none z-0 overflow-hidden">` contendo `<svg>` com `class="treasure-path"`, `fill="none"`, `stroke="#CCFF00"`, `strokeWidth="12"`, `strokeLinecap="round"` e o path `d="M 200 200 L 600 250 L 1000 200 L 1000 600 L 600 650 L 200 600 L 200 1000 L 600 1050 L 1000 1000 L 1000 1400 L 600 1450 L 200 1400 L 200 1800 L 600 1850 L 1000 1800"`
- [x] 4.3 Substituir `<ul>` por `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-12 relative z-10">`
- [x] 4.4 Remover o `<li>` wrapper — o `<a>` do ChallengeCard será filho direto do grid

## 5. Componente ChallengeCard (src/components/ChallengeCard.tsx)

- [x] 5.1 Atualizar tipo `ChallengeData` em `src/lib/challenges.ts` para incluir campo `staggerClass: "stagger-1" | "stagger-2" | "stagger-3"` (ou computar pelo índice no mapa em `index.tsx`)
- [x] 5.2 Redesenhar wrapper `<a>`: remover `rounded-xl border border-border-primary` — usar `group relative flex flex-col outline-none focus-visible:ring-4 focus-visible:ring-primary` + classe de stagger (passada como prop ou computada pelo index)
- [x] 5.3 Adicionar número sobreposto: `<div class="absolute -top-14 {left/right}-4 font-black text-9xl {text-on-background | text-brand-lime} z-20 transition-transform group-hover:-translate-y-2 tabular-nums">{challenge.number}</div>` — posição e cor dependem do index/card
- [x] 5.4 Redesenhar corpo do card (cards 1–11): `<div class="bg-surface border-4 border-on-background/20 p-8 pt-16 flex flex-col h-full relative overflow-hidden group-hover:border-on-background transition-colors">`
- [x] 5.5 Implementar card 12 (Pinsplash) com tratamento especial: `bg-[#171717] border-4 border-brand-lime group-hover:bg-[#1f1f1f] transition-colors shadow-2xl`
- [x] 5.6 Adicionar badge de dificuldade absolutamente posicionado: `absolute top-4 {right/left}-4 text-[10px] tracking-widest uppercase px-3 py-1 font-black` — cores por nível (brand-lime/black, primary/white, red-600/white) conforme design.md
- [x] 5.7 Atualizar título: `<h3 class="text-3xl font-black mb-4 leading-none uppercase {text-on-background | text-white}">`
- [x] 5.8 Atualizar descrição: `<p class="text-on-surface-variant text-sm mb-6 leading-relaxed">` (card 12: `text-neutral-400`)
- [x] 5.9 Atualizar seção de component tags: label `text-[9px] uppercase tracking-wider text-outline font-bold` + tags `text-[10px] font-bold px-2 py-1 bg-surface-variant border border-outline/20` (card 12: `bg-neutral-800 text-neutral-300 border border-neutral-700`)
- [x] 5.10 Remover `rounded-xl` do card — cards da Home não têm border-radius

## 6. Componente AppFooter (src/components/AppFooter.tsx)

- [x] 6.1 Redesenhar elemento raiz: `<footer class="w-full py-12 mt-20 bg-on-background border-t-4 border-primary flex flex-col md:flex-row justify-between items-center px-10 gap-4">`
- [x] 6.2 Bloco esquerdo: `<div class="text-[10px] font-bold uppercase tracking-widest text-background">©2024 JOSIEL LIMA | AVANT-GARDE CARTOGRAPHER. ALL RIGHTS RESERVED.</div>`
- [x] 6.3 Bloco direito: flex com `gap-8` contendo STATUS, LOC, TIME

## 7. FABs Flutuantes (src/routes/index.tsx)

- [x] 7.1 Adicionar `<div class="fixed bottom-10 right-10 z-50 flex flex-col gap-4">` com botão Map e botão Scroll to top

## 8. Ajuste em __root.tsx

- [x] 8.1 Atualizar título para 'JOSIEL LIMA | GREATFRONT PROJECTS'
- [x] 8.2 Sem pt- no body — hero já tem pt-32 para compensar o nav fixed

## 9. Dados dos Desafios (src/lib/challenges.ts)

- [x] 9.1 Todos os 12 challenges com componentes alinhados ao Stitch HTML
- [x] 9.2 Descrições em inglês alinhadas ao Stitch HTML

## 10. Acessibilidade & Qualidade

- [x] 10.1 `<header>` hero com `aria-labelledby="hero-heading"` e H1 com `id="hero-heading"`
- [x] 10.2 Nav com `aria-label="Navegação principal"`
- [x] 10.3 Todos os botões com `aria-label` descritivo
- [x] 10.4 SVG trail com `aria-hidden="true"` no wrapper
- [x] 10.5 Contraste `#FAFAFA` sobre `#171717` no footer — ratio ~16:1, WCAG AAA ✓
- [x] 10.6 Rodar `npm run check` (Biome) e corrigir erros de lint/formato
