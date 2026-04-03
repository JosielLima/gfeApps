## ADDED Requirements

### Requirement: Página Home exibe os 12 desafios como mapa editorial-brutalist

A rota raiz (`/`) SHALL renderizar uma página completa com: nav fixa com `border-b-4`, seção Hero com overlay de pontos e H1 gigante, `<main>` com trilha SVG animada e grade de 12 ChallengeCards com números sobrepostos, AppFooter dark invertido, e FABs flutuantes. Os dados SHALL ser estáticos em `src/lib/challenges.ts`.

#### Scenario: Home carrega sem loading state

- **WHEN** o usuário acessa a rota `/`
- **THEN** a página renderiza imediatamente sem spinner ou skeleton, exibindo todos os 12 cards

#### Scenario: Cards ordenados de 01 a 12 com stagger vertical

- **WHEN** a viewport é maior que 1024px (3 colunas)
- **THEN** os cards aparecem na ordem 01–12 da esquerda para a direita, e as colunas 2 e 3 têm offset vertical de 4rem e 8rem respectivamente (classes `stagger-2` e `stagger-3`)

#### Scenario: Card exibe número sobreposto, badge de dificuldade, título uppercase e descrição

- **WHEN** um ChallengeCard é renderizado
- **THEN** exibe: número `text-9xl font-black` absolutamente posicionado acima do card (`-top-14`), badge de dificuldade absolutamente posicionado no topo interno do card (`top-4`), título em `text-3xl font-black uppercase` e descrição em `text-sm text-on-surface-variant`

#### Scenario: Badge de dificuldade usa cores do Stitch

- **WHEN** um card com dificuldade Starter ou Mid é renderizado
- **THEN** o badge usa `bg-brand-lime text-black`

- **WHEN** um card com dificuldade Senior é renderizado
- **THEN** o badge usa `bg-primary text-white`

- **WHEN** um card com dificuldade Nightmare é renderizado
- **THEN** o badge usa `bg-red-600 text-white`

#### Scenario: Card 12 (Pinsplash) tem tratamento dark especial

- **WHEN** o card de número 12 é renderizado
- **THEN** o corpo do card usa `bg-[#171717] border-4 border-brand-lime`, o número usa `text-brand-lime` e o título usa `text-white`

#### Scenario: Hover do card escurece a borda

- **WHEN** o mouse está sobre um card (cards 1–11)
- **THEN** a borda transita de `border-on-background/20` para `border-on-background` (opacidade 100%) via `transition-colors`

- **WHEN** o mouse está sobre o número do card
- **THEN** o número sobe `-translate-y-2` via `group-hover:-translate-y-2`

#### Scenario: Card é navegável por teclado

- **WHEN** o usuário pressiona Tab até um ChallengeCard e pressiona Enter
- **THEN** o foco é visível (`focus-visible:ring-4 focus-visible:ring-primary`) e a navegação para a rota do desafio é acionada

#### Scenario: Layout do grid é responsivo

- **WHEN** a viewport é inferior a 768px
- **THEN** os cards são exibidos em 1 coluna (sem stagger)

- **WHEN** a viewport está entre 768px e 1024px
- **THEN** os cards são exibidos em 2 colunas

- **WHEN** a viewport é maior que 1024px
- **THEN** os cards são exibidos em 3 colunas com stagger vertical

---

### Requirement: Navigation exibe branding e links com hover colorido

O `<AppHeader>` SHALL ser `fixed` (não sticky) com `border-b-4 border-on-background` e usar `bg-background/80 backdrop-blur-xl`. Links de navegação SHALL exibir hover com `bg-primary text-white`. O link ativo SHALL usar `text-primary`.

#### Scenario: Nav é fixed e ocupa toda a largura

- **WHEN** a Home é renderizada e o usuário faz scroll
- **THEN** o nav permanece fixo no topo com `z-50`, visível sobre o conteúdo

#### Scenario: Nav exibe branding correto

- **WHEN** a Home é renderizada
- **THEN** o nav exibe "JOSIEL LIMA" em `font-black text-xl tracking-tighter`

#### Scenario: Nav link ativo usa cor primary

- **WHEN** o usuário está na rota `/`
- **THEN** o link "CHALLENGES" usa `text-primary font-black`

#### Scenario: Nav link hover usa background primary

- **WHEN** o usuário passa o mouse sobre um nav link inativo
- **THEN** o link aplica `bg-primary text-white px-2 py-1`

#### Scenario: Icon buttons têm focus-visible

- **WHEN** o usuário navega por teclado até os icon buttons (settings, grid_view)
- **THEN** cada botão exibe `focus-visible:ring-2 focus-visible:ring-primary`

---

### Requirement: Hero exibe título gigante com overlay de pontos e layout flex

A seção hero SHALL usar overlay de pontos radiais (`.grid-overlay`), layout `flex-col md:flex-row items-end justify-between`, H1 em `text-6xl md:text-9xl font-black tracking-tighter leading-[0.8]` e tagline à direita em desktop.

#### Scenario: Hero exibe H1 com duas linhas

- **WHEN** a seção hero é renderizada
- **THEN** o H1 contém "GREATFRONT PROJECTS" em `text-on-background` e um `<span>` "Component Tracks App" em `text-outline uppercase`

#### Scenario: Hero exibe eyebrow "Expedition: Josiel Lima"

- **WHEN** a seção hero é renderizada
- **THEN** um `<p>` com `text-sm uppercase tracking-widest text-primary font-bold` exibe "Expedition: Josiel Lima"

#### Scenario: Hero usa semântica correta

- **WHEN** a seção hero é inspecionada
- **THEN** usa elemento `<header>` com `aria-labelledby` apontando para o `id` do H1

---

### Requirement: Trilha SVG animada aparece atrás dos cards

Uma `<svg>` com `class="treasure-path"` SHALL estar posicionada como `absolute inset-0 z-0` dentro do `<main>`, com `stroke="#CCFF00"` e animação `dash 30s linear infinite`.

#### Scenario: SVG trail está atrás dos cards

- **WHEN** a seção de cards é renderizada
- **THEN** o SVG tem `z-index: 0` e os cards têm `z-index: 10` — os cards ficam sobre a trilha

#### Scenario: Animação da trilha está ativa

- **WHEN** a Home é renderizada
- **THEN** o `path` com classe `treasure-path` tem `stroke-dasharray: 20` e `animation: dash 30s linear infinite`

---

### Requirement: AppFooter é dark com borda indigo

O `<AppFooter>` SHALL usar `bg-on-background border-t-4 border-primary`, exibir copyright em `text-background` e status "OPERATIONAL" em `text-brand-lime`.

#### Scenario: Footer exibe metadados completos

- **WHEN** o AppFooter é renderizado
- **THEN** exibe: "©2024 JOSIEL LIMA | AVANT-GARDE CARTOGRAPHER. ALL RIGHTS RESERVED." e "STATUS: OPERATIONAL" (brand-lime), "LOC: BRAZIL" e "TIME: UTC-3" (background/60)

#### Scenario: Footer usa background dark

- **WHEN** o footer é inspecionado no DOM
- **THEN** usa `bg-on-background` (`#171717`) com `border-t-4 border-primary` (indigo) — invertido em relação à página

---

### Requirement: FABs flutuantes fixos no canto inferior direito

Dois botões SHALL estar `fixed bottom-10 right-10 z-50`: um botão "Map" com `bg-on-background border-brand-lime` e um botão "Scroll to top" com `bg-background border-on-background`.

#### Scenario: FAB Map usa hover brand-lime

- **WHEN** o usuário passa o mouse sobre o botão Map
- **THEN** o fundo transita para `bg-brand-lime` e o ícone para `text-on-background`

#### Scenario: FAB Scroll to top funciona

- **WHEN** o usuário clica no botão arrow_upward
- **THEN** a página faz scroll suave para o topo (`scrollTo({top: 0, behavior: 'smooth'})`)
