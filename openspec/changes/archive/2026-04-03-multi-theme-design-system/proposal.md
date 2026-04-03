## Por que

Todos os 12 desafios GFE usam o mesmo design system **Untitled UI** — confirmado comparando os style guides dos desafios 01, 02, 03 e 12. Todos utilizam tokens idênticos: indigo-700 como cor primária, escala neutral-50→900, Noto Sans como tipografia e cores semânticas padrão para erro/sucesso. O home dashboard também será construído com os mesmos tokens.

Sem uma fundação de tokens bem definida em `src/styles.css` e uma biblioteca de componentes headless, cada desafio reimplementaria os mesmos padrões acessíveis (diálogos, selects, checkboxes) de forma inconsistente e com resultados visuais divergentes.

## O que muda

- Substituir os tokens de marca atuais em `src/styles.css` por um único bloco `@theme` com a hierarquia semântica do Untitled UI (primitivos de marca → tokens de texto, fundo e borda).
- Atualizar o import do Google Fonts para **Noto Sans** (pesos 400, 500, 600, 700). Remover Manrope e Fraunces.
- Instalar **Base-UI** (`@base-ui-components/react`) como biblioteca de primitivos headless para componentes acessíveis.
- Atualizar estilos globais do `body` e utilitários para referenciar os novos nomes de token.
- Sem `ThemeProvider`, sem blocos `@theme inline` por desafio — um único design system, aplicado globalmente.

## Capacidades

### Novas capacidades

- `untitled-ui-tokens`: O bloco `@theme` em `src/styles.css` define o conjunto completo de tokens do Untitled UI como CSS custom properties do Tailwind v4, disponíveis globalmente em todas as rotas.

### Capacidades removidas

- ~~`theme-provider`~~: Não é mais necessário — um único conjunto de tokens cobre todas as rotas incluindo o home.
- ~~`tailwind-theme-tokens` (escopo por desafio)~~: Substituído por um único bloco `@theme` global.

## Impacto

- `src/styles.css` — substituir blocos de tokens de marca e import de fonte pelos tokens Untitled UI e Noto Sans.
- `package.json` / `pnpm-lock.yaml` — adicionar `@base-ui-components/react`.
- Nenhum arquivo de componente novo nesta etapa (os primitivos Base-UI são consumidos diretamente por cada desafio conforme necessário).
- Nenhuma mudança de `ThemeProvider`, `themes.ts` ou layouts de rota.
