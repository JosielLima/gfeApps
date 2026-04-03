## Requisitos

### Requisito: `@theme` define o conjunto de tokens Untitled UI globalmente

`src/styles.css` DEVE declarar um único bloco `@theme` contendo dois níveis de tokens:

1. **Primitivos de marca** (`--color-brand-*`): aliases apontando para a escala `indigo` built-in do Tailwind v4 (50 → 900).
2. **Tokens semânticos** por camada:
   - `--color-fg-*` para texto e ícones
   - `--color-bg-*` para fundos
   - `--color-border-*` para bordas

Nenhum bloco `@theme inline` por desafio é utilizado.

#### Cenário: Token de marca resolve para indigo-700

- **QUANDO** um componente usa `bg-brand-700`
- **ENTÃO** o fundo resolve para `#4338CA` (indigo-700) em qualquer rota da aplicação

#### Cenário: Token semântico de texto resolve corretamente

- **QUANDO** um componente usa `text-fg-primary`
- **ENTÃO** a cor resolve para `#171717` (neutral-900)

#### Cenário: Token semântico de borda resolve corretamente

- **QUANDO** um componente usa `border-border-primary`
- **ENTÃO** a borda resolve para `#E6E6E6` (neutral-200)

#### Cenário: Noto Sans é a tipografia padrão

- **QUANDO** qualquer elemento usa `font-sans` (explícito ou herdado do `body`)
- **ENTÃO** a tipografia renderizada é Noto Sans

---

### Requisito: `@theme` expõe vocabulário semântico do Stitch como utilities Tailwind

`src/styles.css` DEVE declarar, no mesmo bloco `@theme`, um terceiro grupo de tokens — o vocabulário Stitch — usados na Home (`/`) e compatíveis com o `tailwind.config` do Stitch HTML:

- `--color-on-background`: `#171717` (Neutral-900)
- `--color-background`: `#FAFAFA` (Neutral-50)
- `--color-surface`: `#FFFFFF`
- `--color-surface-container`: `#F5F5F5` (Neutral-50 alt)
- `--color-surface-variant`: `#E5E5E5` (Neutral-200)
- `--color-on-surface-variant`: `#525252` (Neutral-600)
- `--color-outline`: `#A3A3A3` (Neutral-400)
- `--color-primary`: `#4338CA` (alias direto para indigo-700)
- `--color-brand-lime`: `#CCFF00`

Além dos tokens de cor, `styles.css` DEVE declarar as seguintes classes utilitárias CSS (fora do `@theme`) para suporte à Home:

```css
.grid-overlay {
  background-image: radial-gradient(circle, #A3A3A3 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.1;
}

.stagger-1 { margin-top: 0; }
.stagger-2 { margin-top: 4rem; }
.stagger-3 { margin-top: 8rem; }

@keyframes dash {
  to { stroke-dashoffset: 0; }
}

.treasure-path {
  stroke-dasharray: 20;
  stroke-dashoffset: 1000;
  animation: dash 30s linear infinite;
}

.tabular-nums {
  font-variant-numeric: tabular-nums;
}
```

#### Cenário: Token `on-background` resolve para Neutral-900

- **QUANDO** um componente usa `bg-on-background` ou `text-on-background`
- **ENTÃO** a cor resolve para `#171717`

#### Cenário: Token `background` resolve para Neutral-50

- **QUANDO** um componente usa `bg-background`
- **ENTÃO** o fundo resolve para `#FAFAFA`

#### Cenário: Token `surface` resolve para branco puro

- **QUANDO** um componente usa `bg-surface`
- **ENTÃO** o fundo resolve para `#FFFFFF`

#### Cenário: Token `surface-variant` resolve para Neutral-200

- **QUANDO** um componente usa `bg-surface-variant`
- **ENTÃO** o fundo resolve para `#E5E5E5`

#### Cenário: Token `on-surface-variant` resolve para Neutral-600

- **QUANDO** um componente usa `text-on-surface-variant`
- **ENTÃO** a cor resolve para `#525252`

#### Cenário: Token `outline` resolve para Neutral-400

- **QUANDO** um componente usa `text-outline`
- **ENTÃO** a cor resolve para `#A3A3A3`

#### Cenário: Token `primary` resolve para Indigo-700

- **QUANDO** um componente usa `bg-primary` ou `text-primary`
- **ENTÃO** a cor resolve para `#4338CA`

#### Cenário: Token `brand-lime` resolve para `#CCFF00`

- **QUANDO** um componente usa `bg-brand-lime` ou `text-brand-lime`
- **ENTÃO** a cor resolve para `#CCFF00`

#### Cenário: Tokens Untitled UI existentes não são afetados

- **QUANDO** um componente usa `bg-brand-700`
- **ENTÃO** o fundo resolve para `#4338CA` (indigo-700) sem regressão

- **QUANDO** um componente usa `text-fg-primary`
- **ENTÃO** a cor resolve para `#171717` (neutral-900) sem regressão

#### Cenário: Google Fonts carrega Material Symbols Outlined

- **QUANDO** a Home é renderizada
- **ENTÃO** a font `Material Symbols Outlined` está disponível para os icon buttons do nav e FABs

---

### Requisito: Escalas built-in do Tailwind são usadas diretamente para neutros, erro e sucesso

Componentes DEVEM usar as utilidades built-in `neutral-*`, `red-*` e `green-*` do Tailwind para gradações intermediárias não cobertas pelos tokens semânticos. Os valores dessas escalas coincidem exatamente com os do style guide Untitled UI e não requerem alias adicional.

#### Cenário: Neutral-900 coincide com o style guide

- **QUANDO** um componente usa `text-neutral-900`
- **ENTÃO** a cor é `#171717`, valor confirmado no style guide do desafio 01
