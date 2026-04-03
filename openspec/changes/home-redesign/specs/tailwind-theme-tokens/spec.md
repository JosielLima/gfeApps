## MODIFIED Requirements

### Requirement: `@theme` define o conjunto de tokens globalmente

`src/styles.css` DEVE declarar um único bloco `@theme` contendo os tokens do design system Untitled UI (light) **somente**. Os tokens dark "Cartographer's Edge" adicionados indevidamente no change anterior DEVEM ser removidos. Um único token de acento DEVE ser adicionado:

- `--color-lime-accent: #CCFF00` — usado exclusivamente nos badges de dificuldade "Starter" da Home.

#### Scenario: Token de marca resolve para indigo-700

- **WHEN** um componente usa `bg-brand-700`
- **THEN** o fundo resolve para `#4338CA` (indigo-700) em qualquer rota da aplicação

#### Scenario: Token semântico de texto resolve corretamente

- **WHEN** um componente usa `text-fg-primary`
- **THEN** a cor resolve para `#171717` (neutral-900)

#### Scenario: Token semântico de borda resolve corretamente

- **WHEN** um componente usa `border-border-primary`
- **THEN** a borda resolve para `#E6E6E6` (neutral-200)

#### Scenario: Noto Sans é a tipografia padrão

- **WHEN** qualquer elemento usa `font-sans`
- **THEN** a tipografia renderizada é Noto Sans

#### Scenario: Token lime-accent resolve corretamente

- **WHEN** um componente usa `bg-lime-accent`
- **THEN** o fundo resolve para `#CCFF00`

#### Scenario: Tokens dark não estão presentes no @theme

- **WHEN** o `src/styles.css` é inspecionado
- **THEN** não existem tokens `--color-surface-*`, `--color-primary`, `--color-on-surface*`, `--color-outline*` com valores dark no bloco `@theme`
