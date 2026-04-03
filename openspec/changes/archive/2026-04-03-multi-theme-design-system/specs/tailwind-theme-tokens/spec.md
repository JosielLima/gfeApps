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

### Requisito: Escalas built-in do Tailwind são usadas diretamente para neutros, erro e sucesso

Componentes DEVEM usar as utilidades built-in `neutral-*`, `red-*` e `green-*` do Tailwind para gradações intermediárias não cobertas pelos tokens semânticos. Os valores dessas escalas coincidem exatamente com os do style guide Untitled UI e não requerem alias adicional.

#### Cenário: Neutral-900 coincide com o style guide

- **QUANDO** um componente usa `text-neutral-900`
- **ENTÃO** a cor é `#171717`, valor confirmado no style guide do desafio 01
