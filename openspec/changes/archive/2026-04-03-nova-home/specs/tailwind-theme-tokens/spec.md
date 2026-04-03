## MODIFIED Requirements

### Requirement: `@theme` expõe vocabulário semântico do Stitch como utilities Tailwind

`src/styles.css` DEVE declarar um único bloco `@theme` contendo dois grupos de tokens:

1. **Tokens Untitled UI (já existentes)**: aliases `--color-brand-*`, `--color-fg-*`, `--color-bg-*`, `--color-border-*` — usados nas rotas `/apps/*`.
2. **Tokens do vocabulário Stitch (novos)**: aliases que mapeiam os nomes usados no `tailwind.config` do Stitch HTML para os valores corretos — usados na Home (`/`):
   - `--color-on-background`: `#171717` (Neutral-900)
   - `--color-background`: `#FAFAFA` (Neutral-50)
   - `--color-surface`: `#FFFFFF`
   - `--color-surface-container`: `#F5F5F5` (Neutral-50 alt)
   - `--color-surface-variant`: `#E5E5E5` (Neutral-200)
   - `--color-on-surface-variant`: `#525252` (Neutral-600)
   - `--color-outline`: `#A3A3A3` (Neutral-400)
   - `--color-primary` (já parcialmente existe como `brand-700`, mas precisa do alias direto): `#4338CA`

Além dos tokens de cor, adicionar classes utilitárias CSS em `styles.css` (fora do `@theme`) para o stagger e grid-overlay:
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

Nenhum bloco `@theme inline` por desafio é utilizado.

#### Scenario: Token `on-background` resolve para Neutral-900

- **WHEN** um componente usa `bg-on-background` ou `text-on-background`
- **THEN** a cor resolve para `#171717`

#### Scenario: Token `background` resolve para Neutral-50

- **WHEN** um componente usa `bg-background`
- **THEN** o fundo resolve para `#FAFAFA`

#### Scenario: Token `surface` resolve para branco puro

- **WHEN** um componente usa `bg-surface`
- **THEN** o fundo resolve para `#FFFFFF`

#### Scenario: Token `surface-variant` resolve para Neutral-200

- **WHEN** um componente usa `bg-surface-variant`
- **THEN** o fundo resolve para `#E5E5E5`

#### Scenario: Token `on-surface-variant` resolve para Neutral-600

- **WHEN** um componente usa `text-on-surface-variant`
- **THEN** a cor resolve para `#525252`

#### Scenario: Token `outline` resolve para Neutral-400

- **WHEN** um componente usa `text-outline`
- **THEN** a cor resolve para `#A3A3A3`

#### Scenario: Token `primary` resolve para Indigo-700

- **WHEN** um componente usa `bg-primary` ou `text-primary`
- **THEN** a cor resolve para `#4338CA`

#### Scenario: Token `brand-lime` resolve para `#CCFF00`

- **WHEN** um componente usa `bg-brand-lime` ou `text-brand-lime`
- **THEN** a cor resolve para `#CCFF00`

#### Scenario: Tokens Untitled UI existentes não são afetados

- **WHEN** um componente usa `bg-brand-700`
- **THEN** o fundo resolve para `#4338CA` (indigo-700) sem regressão

- **WHEN** um componente usa `text-fg-primary`
- **THEN** a cor resolve para `#171717` (neutral-900) sem regressão

#### Scenario: Noto Sans é a tipografia padrão

- **WHEN** qualquer elemento usa `font-sans`
- **THEN** a tipografia renderizada é Noto Sans

#### Scenario: Google Fonts carrega Material Symbols Outlined

- **WHEN** a Home é renderizada
- **THEN** a font `Material Symbols Outlined` está disponível para os icon buttons do nav e FABs
