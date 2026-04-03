## Status: Removido

A capacidade `theme-provider` foi removida após análise dos style guides confirmar que todos os 12 desafios GFE e o home dashboard utilizam o mesmo design system Untitled UI com valores de token idênticos.

Um componente `ThemeProvider` e escopo por classe CSS não são mais necessários. Todos os requisitos de token são atendidos por um único bloco `@theme` global em `src/styles.css`.

Consulte `specs/tailwind-theme-tokens/spec.md` para os requisitos atuais.
