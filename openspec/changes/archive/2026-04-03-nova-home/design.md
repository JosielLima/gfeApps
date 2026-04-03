# Design System: Noto Sans Styleguide Portfolio (Stitch)

> Fonte de verdade: Stitch screen `132a3ca4bbcf42189e512589e7d34f4f`, projeto `2319137774723414353`.
> Todas as decisões visuais abaixo derivam diretamente do HTML gerado pelo Stitch — nenhum estilo foi inventado.

---

## 1. Visual Theme & Atmosphere

A Home é um **portfólio editorial-brutalist em tema light**. O fundo é `#FAFAFA` (Neutral-50) — off-white que evita o "brilho" do branco puro. Sobre ele, o conteúdo usa Noto Sans em peso black (900) para headings e bold (700) para corpo, criando blocos densos de autoridade tipográfica.

O vocabulário visual é **anti-SaaS**: bordas grossas de 4px (`border-4`), números gigantes (`text-9xl`) que transbordam os cards, hero com overlay de pontos radiais e tipografia em `tracking-tighter leading-[0.8]`. A cor de destaque é `#CCFF00` (brand-lime) — um sinal neón sobre fundo claro, usado exclusivamente em badges Starter e no card 12 (Pinsplash).

O único momento de inversão é o **footer**: `bg-on-background` (preto `#171717`) com `border-t-4 border-primary` (indigo), criando uma âncora visual no final da página que contrasta dramaticamente com o conteúdo claro.

**Características-chave:**
- Background `#FAFAFA` — nunca branco puro
- Font única: Noto Sans (weight 400–900)
- Bordas `border-4` nos cards + `border-b-4` no nav — brutalismo tipográfico
- Números `text-9xl font-black tabular-nums` absolutamente posicionados sobre os cards
- Stagger vertical: cards em 3 colunas com offset de 0 / 4rem / 8rem no eixo Y
- Trilha SVG animada em `#CCFF00` (stroke-dasharray animation, 30s linear infinite)
- Footer dark invertido: `bg-[#171717] border-t-4 border-[#4338CA]`
- FABs fixos no canto inferior direito: mapa + scroll-to-top

---

## 2. Color Palette & Roles

Baseada no bloco `tailwind.config` do Stitch HTML:

### Background & Surface
- **`background`** (`#FAFAFA`, Neutral-50): fundo da página — `bg-background`
- **`surface`** (`#FFFFFF`): cards e painéis brancos — `bg-surface`
- **`surface-container`** (`#F5F5F5`): áreas de conteúdo secundário — `bg-surface-container`
- **`surface-variant`** (`#E5E5E5`, Neutral-200): tags de componentes, fundo de badges neutros — `bg-surface-variant`

### Text
- **`on-background`** (`#171717`, Neutral-900): texto principal, bordas grossas, footer background — `text-on-background`, `bg-on-background`, `border-on-background`
- **`on-surface-variant`** (`#525252`, Neutral-600): texto de descrição dos cards — `text-on-surface-variant`
- **`outline`** (`#A3A3A3`, Neutral-400): bordas secundárias, path do SVG quando inativo — `text-outline`

### Accent & Brand
- **`primary`** (`#4338CA`, Indigo-700): nav link ativo, badge Senior, footer border-top, focus ring — `bg-primary`, `text-primary`, `border-primary`
- **`brand-lime`** (`#CCFF00`): badge Starter, badge Mid, número do card 12, stroke da trilha SVG, border do card 12, hover do FAB — `bg-brand-lime`, `text-brand-lime`, `border-brand-lime`

### Special: Card 12 (Pinsplash)
- `bg-[#171717]` (on-background solid) com `border-4 border-brand-lime`
- `hover:bg-[#1f1f1f]`
- Número em `text-brand-lime`, título em `text-white`
- Tags em `bg-neutral-800 text-neutral-300 border border-neutral-700`

---

## 3. Typography Rules

### Font Family
- **Única família**: `Noto Sans` — carregada via Google Fonts, weights 400, 500, 600, 700, 800, 900.
- Fallback: `sans-serif`
- Token Tailwind: `--font-sans: "Noto Sans", sans-serif` (já definido em `styles.css`)

### Hierarchy

| Role | Size | Weight | Class Tailwind | Notas |
|------|------|--------|---------------|-------|
| Brand logo | `text-xl` | 900 | `font-black tracking-tighter` | "JOSIEL LIMA" no nav |
| Hero eyebrow | `text-sm` | 700 | `uppercase tracking-widest text-primary font-bold` | "Expedition: Josiel Lima" |
| Hero H1 | `text-6xl md:text-9xl` | 900 | `font-black tracking-tighter leading-[0.8]` | "GREATFRONT PROJECTS" |
| Hero H1 span | (mesmo) | 900 | `text-outline uppercase` | "Component Tracks App" |
| Hero description | `text-[10px]` | 700 | `uppercase tracking-[0.2em]` | sidebar direita do hero |
| Card number | `text-9xl` | 900 | `font-black tabular-nums` | sobreposto ao card |
| Card title | `text-3xl` | 900 | `font-black leading-none uppercase` | dentro do card |
| Card description | `text-sm` | 400 | `leading-relaxed text-on-surface-variant` | — |
| Nav links | `text-[11px]` | 900 | `uppercase tracking-widest font-black` | hover: `bg-primary text-white` |
| Components label | `text-[9px]` | 700 | `uppercase tracking-wider text-outline font-bold` | "Components:" |
| Component tags | `text-[10px]` | 700 | `font-bold` | dentro de `bg-surface-variant` |
| Footer copyright | `text-[10px]` | 700 | `uppercase tracking-widest text-background` | — |
| Footer metadata | `text-[10px]` | 900 | `uppercase tracking-widest` | STATUS em `text-brand-lime`, demais em `text-background/60` |

---

## 4. Component Stylings

### Navigation (AppHeader)

```
<nav fixed top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b-4 border-on-background>
  justify-between items-center px-6 py-4
  left:  "JOSIEL LIMA" — font-black text-xl tracking-tighter text-on-background
  right: nav links (hidden md:flex gap-6) + icon buttons (settings, grid_view)
```

Nav links:
- Default: `uppercase tracking-widest text-[11px] text-on-background font-bold`
- Active (CHALLENGES): `text-primary font-black`
- Hover: `hover:bg-primary hover:text-white px-2 py-1`
- Todos: `transition-colors duration-200`

Icon buttons (settings, grid_view):
- `material-symbols-outlined text-on-background cursor-pointer scale-95 active:scale-90`
- `focus-visible:ring-2 focus-visible:ring-primary outline-none`

### Hero Section

```html
<header relative pt-32 pb-20 px-6 md:px-20 overflow-hidden>
  <!-- Grid overlay: radial-gradient(circle, #A3A3A3 1px, transparent 1px) bg-size 40px 40px opacity-[0.1] -->
  <div absolute inset-0 grid-overlay />
  
  <div relative z-10 flex flex-col md:flex-row items-end justify-between gap-8>
    <!-- Left block -->
    <div max-w-4xl>
      <p text-sm uppercase tracking-widest text-primary font-bold mb-4>Expedition: Josiel Lima</p>
      <h1 text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] text-on-background>
        GREATFRONT PROJECTS <br/>
        <span text-outline uppercase>Component Tracks App</span>
      </h1>
    </div>
    <!-- Right tagline (desktop only) -->
    <div text-[10px] uppercase tracking-[0.2em] font-bold text-right border-l-4 border-on-background pl-6 max-w-xs leading-relaxed>
      Mapping the technical landscape through brutalist iteration. Each node represents a leap in UI complexity.
    </div>
  </div>
</header>
```

### SVG Treasure Trail

```html
<!-- absolute inset-0 pointer-events-none z-0 overflow-hidden (dentro do <main>) -->
<svg w-full h-full preserveAspectRatio="none" viewBox="0 0 1200 2400">
  <path
    class="treasure-path"  <!-- animation: stroke-dasharray 20, stroke-dashoffset 1000→0, 30s linear infinite -->
    d="M 200 200 L 600 250 L 1000 200 ..."
    fill="none"
    stroke="#CCFF00"
    stroke-width="12"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

CSS para a animação:
```css
@keyframes dash {
  to { stroke-dashoffset: 0; }
}
.treasure-path {
  stroke-dasharray: 20;
  stroke-dashoffset: 1000;
  animation: dash 30s linear infinite;
}
```

### Challenge Cards

**Grid container:**
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-12 relative z-10
```

**Stagger classes (aplicadas no `<a>` do card):**
- `.stagger-1`: `margin-top: 0`
- `.stagger-2`: `margin-top: 4rem`
- `.stagger-3`: `margin-top: 8rem`

Padrão de stagger por posição no grid (coluna → classe):
- Col 1 (cards 1, 4, 7, 10): `stagger-1`
- Col 2 (cards 2, 5, 8, 11): `stagger-2`
- Col 3 (cards 3, 6, 9): `stagger-3`
- Card 12: sem classe stagger (alinhado naturalmente)

**Posição do número por índice (par/ímpar no layout visual):**
- Números de cards ímpares (1, 3, 5, ...): `absolute -top-14 -left-4` com `text-on-background`
- Números de cards pares (2, 4, 6, ...): `absolute -top-14 -right-4` com `text-on-background`
- Card 12: número em `text-brand-lime -right-4`

**Wrapper do card (`<a>`):**
```
group relative flex flex-col outline-none
focus-visible:ring-4 focus-visible:ring-primary
```

**Corpo do card (cards 1–11):**
```
bg-surface border-4 border-on-background/20 p-8 pt-16 flex flex-col h-full relative overflow-hidden
group-hover:border-on-background transition-colors
```

**Card 12 (Pinsplash — dark special):**
```
bg-[#171717] border-4 border-brand-lime p-8 pt-16 flex flex-col h-full relative
group-hover:bg-[#1f1f1f] transition-colors shadow-2xl
```

**Difficulty badge (absolutamente posicionado):**
```
absolute top-4 right-4 (ou left-4 — alternado por card)
text-[10px] tracking-widest uppercase px-3 py-1 font-black
```

Cores por dificuldade:
- `Starter`: `bg-brand-lime text-black` + posição `right-4`
- `Mid`: `bg-brand-lime text-black` + posição `left-4` ou `right-4` conforme card
- `Mid Premium`: `bg-brand-lime text-black`
- `Senior`: `bg-primary text-white` + posição `right-4` ou `left-4`
- `Senior Premium`: `bg-primary text-white`
- `Nightmare`: `bg-red-600 text-white`

**Card title:** `text-3xl font-black mb-4 leading-none uppercase text-on-background`
(Card 12: `text-white`)

**Card description:** `text-on-surface-variant text-sm mb-6 leading-relaxed`
(Card 12: `text-neutral-400`)

**Component tags section:**
```
mt-auto space-y-2
  <p text-[9px] uppercase tracking-wider text-outline font-bold>Components:</p>
  <div flex flex-wrap gap-2>
    <span text-[10px] font-bold px-2 py-1 bg-surface-variant border border-outline/20>Tag</span>
  </div>
```
(Card 12: tags em `bg-neutral-800 text-neutral-300 border-neutral-700`)

**Hover do número:** `transition-transform group-hover:-translate-y-2`

### AppFooter

```html
<footer w-full py-12 mt-20 bg-on-background border-t-4 border-primary
        flex flex-col md:flex-row justify-between items-center px-10 gap-4>
  
  <div text-[10px] font-bold uppercase tracking-widest text-background>
    ©2024 JOSIEL LIMA | AVANT-GARDE CARTOGRAPHER. ALL RIGHTS RESERVED.
  </div>
  
  <div flex gap-8>
    <span text-[10px] font-black uppercase tracking-widest text-brand-lime>STATUS: OPERATIONAL</span>
    <button text-[10px] font-bold uppercase tracking-widest text-background/60 hover:text-primary
            focus-visible:ring-1 focus-visible:ring-brand-lime outline-none>LOC: BRAZIL</button>
    <button text-[10px] font-bold uppercase tracking-widest text-background/60 hover:text-primary
            focus-visible:ring-1 focus-visible:ring-brand-lime outline-none>TIME: UTC-3</button>
  </div>
</footer>
```

### Floating Action Buttons (FABs)

```html
<div fixed bottom-10 right-10 z-50 flex flex-col gap-4>
  <!-- Map button -->
  <button w-16 h-16 bg-on-background text-background flex items-center justify-center
          border-4 border-brand-lime hover:bg-brand-lime hover:text-on-background
          transition-all active:scale-95 shadow-xl
          focus-visible:ring-4 focus-visible:ring-brand-lime outline-none
          aria-label="Open Map View">
    <span material-symbols-outlined text-3xl>map</span>
  </button>
  
  <!-- Scroll to top -->
  <button w-16 h-16 bg-background text-on-background flex items-center justify-center
          border-4 border-on-background hover:bg-on-background hover:text-background
          transition-all active:scale-95
          focus-visible:ring-4 focus-visible:ring-primary outline-none
          onclick="window.scrollTo({top: 0, behavior: 'smooth'})"
          aria-label="Scroll to Top">
    <span material-symbols-outlined text-3xl>arrow_upward</span>
  </button>
</div>
```

---

## 5. Layout Principles

### Container & Spacing
- **Nav:** `px-6 py-4` — full-width, sem container máximo
- **Hero:** `px-6 md:px-20`, `pt-32 pb-20` — full-width, sem container máximo
- **Main (cards):** `px-6 md:px-20 pb-40` — sem container máximo
- **Footer:** `px-10 py-12` — full-width
- Não usar `.page-wrap` (max-w-6xl) na Home — o design usa full-width intencionalmente

### Card Grid
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- `gap-y-32 gap-x-12` — gap vertical enorme para acomodar os números sobrepostos
- `relative z-10` — cards ficam acima do SVG trail

### Stagger Pattern
O stagger é aplicado por CSS class nos wrappers dos cards (não com Tailwind puro):
```css
.stagger-1 { margin-top: 0; }
.stagger-2 { margin-top: 4rem; }
.stagger-3 { margin-top: 8rem; }
```
Definidas em `styles.css` (fora do `@theme`).

### Z-Index Stack
1. SVG trail: `z-0` (atrás de tudo no `<main>`)
2. Cards: `z-10`
3. Números dos cards: `z-20` (acima do corpo do card)
4. Nav: `z-50`
5. FABs: `z-50`

---

## 6. Responsive Behavior

| Breakpoint | Nav | Hero H1 | Grid |
|---|---|---|---|
| Mobile (<768px) | links ocultos | `text-6xl` | 1 coluna, stagger off |
| Tablet (768–1024px) | links visíveis | `text-7xl` | 2 colunas |
| Desktop (>1024px) | completo | `text-9xl` | 3 colunas + stagger |

O stagger vertical (`stagger-2`, `stagger-3`) só é visualmente relevante em 3 colunas. Em 1 coluna, todos os cards usam `stagger-1` implicitamente.

---

## 7. Do's and Don'ts

### Do
- Usar `bg-background` (`#FAFAFA`) como background da página — nunca `bg-white`
- Usar `border-4` (não `border` ou `border-2`) nos cards e no nav
- Usar `font-black` (weight 900) para números e headings do hero
- Usar `text-on-background` para texto principal e bordas escuras
- Usar `bg-brand-lime text-black` para badges Starter e Mid (não `text-white`)
- Usar `gap-y-32` no grid para acomodar os números sobrepostos

### Don't
- Não usar Material Icons via `<img>` — usar a font `material-symbols-outlined` via Google Fonts
- Não usar `position: sticky` no nav — é `fixed` (o conteúdo deve ter `pt-32` para compensar)
- Não usar `rounded-xl` nos cards da Home — os cards usam cantos retos (sem `border-radius`)
- Não usar `max-w-6xl` ou `.page-wrap` na Home — o layout é full-width
- Não remover o `stagger-*` no desktop — faz parte da identidade visual do mapa
