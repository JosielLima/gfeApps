## 1. Dependências

- [x] 1.1 Instalar Base-UI: `npm install @base-ui/react` *(pacote renomeado de `@base-ui-components/react` para `@base-ui/react` — v1.3.0 instalada)*

## 2. Fundação de tokens CSS

- [x] 2.1 Atualizar import de fonte em `src/styles.css`: substituir a URL do Google Fonts (Manrope + Fraunces) por Noto Sans com pesos 400, 500, 600 e 700

- [x] 2.2 Substituir o bloco `@theme` atual e todos os blocos `:root` de tokens de marca em `src/styles.css` pela estrutura semântica do Untitled UI a seguir:

  ```css
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap");

  @theme {
    --font-sans: "Noto Sans", ui-sans-serif, system-ui, sans-serif;

    /* ─── Primitivos de marca (indigo) ──────────────────── */
    --color-brand-50:  var(--color-indigo-50);
    --color-brand-100: var(--color-indigo-100);
    --color-brand-200: var(--color-indigo-200);
    --color-brand-300: var(--color-indigo-300);
    --color-brand-400: var(--color-indigo-400);
    --color-brand-500: var(--color-indigo-500);
    --color-brand-600: var(--color-indigo-600);   /* estado hover */
    --color-brand-700: var(--color-indigo-700);   /* #4338CA — ação primária */
    --color-brand-800: var(--color-indigo-800);
    --color-brand-900: var(--color-indigo-900);

    /* ─── Tokens semânticos — texto (foreground) ─────────────── */
    --color-fg-primary:      var(--color-neutral-900);  /* #171717 */
    --color-fg-secondary:    var(--color-neutral-700);  /* #404040 */
    --color-fg-tertiary:     var(--color-neutral-600);  /* #525252 */
    --color-fg-placeholder:  var(--color-neutral-400);  /* #A3A3A3 */
    --color-fg-disabled:     var(--color-neutral-400);  /* #A3A3A3 */
    --color-fg-brand:        var(--color-brand-700);    /* #4338CA */
    --color-fg-on-brand:     white;
    --color-fg-error:        var(--color-red-600);      /* #DC2626 */
    --color-fg-error-strong: var(--color-red-800);      /* #991B1B */
    --color-fg-success:      var(--color-green-700);    /* #15803D */

    /* ─── Tokens semânticos — fundo (background) ─────────────── */
    --color-bg-primary:      white;
    --color-bg-secondary:    var(--color-neutral-50);   /* #FAFAFA */
    --color-bg-disabled:     var(--color-neutral-200);  /* #E6E6E6 */
    --color-bg-brand:        var(--color-brand-700);    /* #4338CA */
    --color-bg-brand-subtle: var(--color-brand-50);
    --color-bg-error-subtle: var(--color-red-50);       /* #FEF2F2 */

    /* ─── Tokens semânticos — borda ──────────────────────────── */
    --color-border-primary:  var(--color-neutral-200);  /* #E6E6E6 */
    --color-border-strong:   var(--color-neutral-400);  /* #A3A3A3 */
    --color-border-brand:    var(--color-brand-700);    /* #4338CA */
    --color-border-error:    var(--color-red-600);      /* #DC2626 */
    --color-border-disabled: var(--color-neutral-200);  /* #E6E6E6 */
  }
  ```

- [x] 2.3 Atualizar estilos globais de `body` e utilitários em `src/styles.css`: remover todas as referências a `var(--sea-ink)`, `var(--lagoon)`, `var(--foam)`, `var(--palm)`, etc., substituindo pelos tokens semânticos equivalentes em `src/styles.css`, `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/ThemeToggle.tsx`, `src/routes/index.tsx` e `src/routes/about.tsx`

## 3. Verificação

- [x] 3.1 Build de produção executado (`npm run build`) sem erros — CSS gerado em `dist/client/assets/styles-*.css`
- [x] 3.2 Confirmado no CSS gerado: `--color-brand-700: var(--color-indigo-700)` → resolve para `oklch(45.7% .24 277)` ≈ `#4338CA`
- [x] 3.3 Confirmado no CSS gerado: `--color-fg-primary: var(--color-neutral-900)` → `oklch(20.5% 0 0)` ≈ `#171717`; `--color-border-primary: var(--color-neutral-200)` → `oklch(92.2% 0 0)` ≈ `#E6E6E6`
- [x] 3.4 Importar um primitivo Base-UI (ex.: `Checkbox.Root`) em um componente de teste — confirmado: renderiza markup acessível e aceita classes Tailwind para estilização
