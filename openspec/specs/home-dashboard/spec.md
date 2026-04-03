## Requisitos

### Requisito: Página Home exibe os 12 desafios como mapa editorial-brutalist

A rota raiz (`/`) SHALL renderizar uma página completa com: nav fixa com `border-b-4`, seção Hero com overlay de pontos e H1 gigante, `<main>` com trilha SVG animada e grade de 12 ChallengeCards com números sobrepostos, AppFooter dark invertido, e FABs flutuantes. Os dados SHALL ser estáticos em `src/lib/challenges.ts`.

#### Cenário: Home carrega sem loading state

- **QUANDO** o usuário acessa a rota `/`
- **ENTÃO** a página renderiza imediatamente sem spinner ou skeleton, exibindo todos os 12 cards

#### Cenário: Cards ordenados de 01 a 12 com stagger vertical

- **QUANDO** a viewport é maior que 1024px (3 colunas)
- **ENTÃO** os cards aparecem na ordem 01–12 da esquerda para a direita, e as colunas 2 e 3 têm offset vertical de 4rem e 8rem respectivamente (classes `stagger-2` e `stagger-3`)

#### Cenário: Card exibe número sobreposto, badge de dificuldade, título uppercase e descrição

- **QUANDO** um ChallengeCard é renderizado
- **ENTÃO** exibe: número `text-9xl font-black` absolutamente posicionado acima do card (`-top-14`), badge de dificuldade absolutamente posicionado no topo interno do card (`top-4`), título em `text-3xl font-black uppercase` e descrição em `text-sm text-on-surface-variant`

#### Cenário: Badge de dificuldade usa cores do Stitch

- **QUANDO** um card com dificuldade Starter ou Mid é renderizado
- **ENTÃO** o badge usa `bg-brand-lime text-black`

- **QUANDO** um card com dificuldade Senior é renderizado
- **ENTÃO** o badge usa `bg-primary text-white`

- **QUANDO** um card com dificuldade Nightmare é renderizado
- **ENTÃO** o badge usa `bg-red-600 text-white`

#### Cenário: Card 12 (Pinsplash) tem tratamento dark especial

- **QUANDO** o card de número 12 é renderizado
- **ENTÃO** o corpo do card usa `bg-[#171717] border-4 border-brand-lime`, o número usa `text-brand-lime` e o título usa `text-white`

#### Cenário: Hover do card escurece a borda

- **QUANDO** o mouse está sobre um card (cards 1–11)
- **ENTÃO** a borda transita de `border-on-background/20` para `border-on-background` (opacidade 100%) via `transition-colors`

- **QUANDO** o mouse está sobre o número do card
- **ENTÃO** o número sobe `-translate-y-2` via `group-hover:-translate-y-2`

#### Cenário: Card é navegável por teclado

- **QUANDO** o usuário pressiona Tab até um ChallengeCard e pressiona Enter
- **ENTÃO** o foco é visível (`focus-visible:ring-4 focus-visible:ring-primary`) e a navegação para a rota do desafio é acionada

#### Cenário: Layout do grid é responsivo

- **QUANDO** a viewport é inferior a 768px
- **ENTÃO** os cards são exibidos em 1 coluna (sem stagger)

- **QUANDO** a viewport está entre 768px e 1024px
- **ENTÃO** os cards são exibidos em 2 colunas

- **QUANDO** a viewport é maior que 1024px
- **ENTÃO** os cards são exibidos em 3 colunas com stagger vertical

---

### Requisito: Navigation exibe branding e links com hover colorido

O `<AppHeader>` SHALL ser `fixed` (não sticky) com `border-b-4 border-on-background` e usar `bg-background/80 backdrop-blur-xl`. Links de navegação SHALL exibir hover com `bg-primary text-white`. O link ativo SHALL usar `text-primary`.

#### Cenário: Nav é fixed e ocupa toda a largura

- **QUANDO** a Home é renderizada e o usuário faz scroll
- **ENTÃO** o nav permanece fixo no topo com `z-50`, visível sobre o conteúdo

#### Cenário: Nav exibe branding correto

- **QUANDO** a Home é renderizada
- **ENTÃO** o nav exibe "JOSIEL LIMA" em `font-black text-xl tracking-tighter`

#### Cenário: Nav link ativo usa cor primary

- **QUANDO** o usuário está na rota `/`
- **ENTÃO** o link "CHALLENGES" usa `text-primary font-black`

#### Cenário: Nav link hover usa background primary

- **QUANDO** o usuário passa o mouse sobre um nav link inativo
- **ENTÃO** o link aplica `bg-primary text-white px-2 py-1`

#### Cenário: Icon buttons têm focus-visible

- **QUANDO** o usuário navega por teclado até os icon buttons (settings, grid_view)
- **ENTÃO** cada botão exibe `focus-visible:ring-2 focus-visible:ring-primary`

---

### Requisito: Hero exibe título gigante com overlay de pontos e layout flex

A seção hero SHALL usar overlay de pontos radiais (`.grid-overlay`), layout `flex-col md:flex-row items-end justify-between`, H1 em `text-6xl md:text-9xl font-black tracking-tighter leading-[0.8]` e tagline à direita em desktop.

#### Cenário: Hero exibe H1 com duas linhas

- **QUANDO** a seção hero é renderizada
- **ENTÃO** o H1 contém "GREATFRONT PROJECTS" em `text-on-background` e um `<span>` "Component Tracks App" em `text-outline uppercase`

#### Cenário: Hero exibe eyebrow "Expedition: Josiel Lima"

- **QUANDO** a seção hero é renderizada
- **ENTÃO** um `<p>` com `text-sm uppercase tracking-widest text-primary font-bold` exibe "Expedition: Josiel Lima"

#### Cenário: Hero usa semântica correta

- **QUANDO** a seção hero é inspecionada
- **ENTÃO** usa elemento `<header>` com `aria-labelledby` apontando para o `id` do H1

---

### Requisito: Trilha SVG animada aparece atrás dos cards

Uma `<svg>` com `class="treasure-path"` SHALL estar posicionada como `absolute inset-0 z-0` dentro do `<main>`, com `stroke="#CCFF00"` e animação `dash 30s linear infinite`.

#### Cenário: SVG trail está atrás dos cards

- **QUANDO** a seção de cards é renderizada
- **ENTÃO** o SVG tem `z-index: 0` e os cards têm `z-index: 10` — os cards ficam sobre a trilha

#### Cenário: Animação da trilha está ativa

- **QUANDO** a Home é renderizada
- **ENTÃO** o `path` com classe `treasure-path` tem `stroke-dasharray: 20` e `animation: dash 30s linear infinite`

---

### Requisito: AppFooter é dark com borda indigo

O `<AppFooter>` SHALL usar `bg-on-background border-t-4 border-primary`, exibir copyright em `text-background` e status "OPERATIONAL" em `text-brand-lime`.

#### Cenário: Footer exibe metadados completos

- **QUANDO** o AppFooter é renderizado
- **ENTÃO** exibe: "©2024 JOSIEL LIMA | AVANT-GARDE CARTOGRAPHER. ALL RIGHTS RESERVED." e "STATUS: OPERATIONAL" (brand-lime), "LOC: BRAZIL" e "TIME: UTC-3" (background/60)

#### Cenário: Footer usa background dark

- **QUANDO** o footer é inspecionado no DOM
- **ENTÃO** usa `bg-on-background` (`#171717`) com `border-t-4 border-primary` (indigo) — invertido em relação à página

---

### Requisito: FABs flutuantes fixos no canto inferior direito

Dois botões SHALL estar `fixed bottom-10 right-10 z-50`: um botão "Map" com `bg-on-background border-brand-lime` e um botão "Scroll to top" com `bg-background border-on-background`.

#### Cenário: FAB Map usa hover brand-lime

- **QUANDO** o usuário passa o mouse sobre o botão Map
- **ENTÃO** o fundo transita para `bg-brand-lime` e o ícone para `text-on-background`

#### Cenário: FAB Scroll to top funciona

- **QUANDO** o usuário clica no botão arrow_upward
- **ENTÃO** a página faz scroll suave para o topo (`scrollTo({top: 0, behavior: 'smooth'})`)
