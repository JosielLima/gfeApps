## Contexto

Análise dos style guides dos desafios 01, 02, 03 e 12 confirmou que todos os desafios GFE usam o mesmo design system **Untitled UI** com valores de token idênticos. O home dashboard também será construído com esses tokens. Um único bloco `@theme` em `src/styles.css` é suficiente — nenhum mecanismo de escopo por desafio é necessário.

## Objetivos / Não-objetivos

**Objetivos:**
- Definir o conjunto completo de tokens semânticos do Untitled UI no Tailwind v4 `@theme`, uma única vez, globalmente.
- Usar Noto Sans como tipografia do projeto em todas as rotas.
- Adotar Base-UI como biblioteca de primitivos headless.
- Manter o sistema de tokens mínimo e semântico: primitivos de marca + aliases semânticos por camada (texto, fundo, borda).

**Não-objetivos:**
- Overrides de tema por desafio (desnecessário — tokens são compartilhados).
- `ThemeProvider` ou escopo por classe CSS (removido).
- Troca dinâmica de tema.
- Definir tokens visuais específicos por desafio (todos compartilham os mesmos valores).

## Decisões

### Decisão 1 — `@theme` global único, sem escopo por desafio

**Escolhido:** Um único bloco `@theme` em `src/styles.css`. Sem classes `.theme-<name>`. Sem componente `ThemeProvider`.

**Por quê:** Análise de 4 dos 12 style guides mostrou valores de token idênticos. Todos os desafios e o home usam Untitled UI. Escopo por desafio adiciona complexidade sem nenhum benefício.

**Descartado:** `ThemeProvider` + blocos `@theme inline` por desafio. Projetado antes da análise dos style guides, sob premissa equivocada de que cada desafio teria identidade visual própria.

---

### Decisão 2 — Dois níveis de token: primitivos + semânticos

**Escolhido:** Hierarquia de tokens em dois níveis dentro do mesmo bloco `@theme`.

**Nível 1 — Primitivos de marca** (`--color-brand-*`): aliases que apontam para a escala `indigo` built-in do Tailwind v4. São os valores brutos — usados apenas para alimentar os tokens semânticos, não diretamente nos componentes.

**Nível 2 — Tokens semânticos** (`--color-fg-*`, `--color-bg-*`, `--color-border-*`): expressam *intenção*, não valor. São estes que os componentes referenciam via classes Tailwind.

```
bg-brand-700       ← primitivo (uso excepcional)
bg-bg-brand        ← semântico (uso padrão em componentes)
```

**Por quê:** `text-fg-primary` é mais legível e resistente a refatoração do que `text-neutral-900`. Se o token de texto primário mudar, uma linha no `@theme` atualiza toda a aplicação. Neutros, erros e sucessos do Tailwind built-in já batem com os valores do Untitled UI — não precisam de alias primitivo, apenas de alias semântico.

---

### Decisão 3 — Base-UI como primitivo headless

**Escolhido:** `@base-ui-components/react` para componentes que exigem acessibilidade complexa: Dialog, Select, Checkbox, Switch, Tabs, Tooltip, Popover, Menu.

**Por quê:** Os componentes do Untitled UI requerem atributos ARIA corretos, armadilha de foco, navegação por teclado e renderização em portal. Base-UI fornece tudo isso sem impor estilos visuais — os componentes são estilizados inteiramente com classes Tailwind. Elimina a necessidade de reimplementar padrões ARIA em cada desafio.

**Alternativa considerada:** Radix UI. Base-UI é o sucessor da equipe MUI, com API menor e integração mais limpa com Tailwind v4.

**Alternativa considerada:** Headless UI (Tailwind Labs). Escopo insuficiente — não possui Select, Tooltip e Popover necessários nos desafios 7 e 9.

---

### Decisão 4 — Noto Sans via Google Fonts

**Escolhido:** Carregar Noto Sans via `@import` em `src/styles.css`, pesos 400/500/600/700. Substituir o import atual de Manrope/Fraunces.

**Por quê:** Noto Sans é confirmada como tipografia em todos os style guides disponíveis. Fraunces e Manrope eram usadas para a identidade de marca do home, que agora converge com o sistema Untitled UI.

## Riscos / Trade-offs

- **Referências `var()` dentro do `@theme`** — `var(--color-neutral-900)` dentro de `@theme` funciona porque o Tailwind v4 emite todas as declarações `@theme` como CSS custom properties em `:root` antes de qualquer bloco de seletor. Verificar resolução no DevTools durante a tarefa 2.2.
- **Base-UI bundle size** — Tree-shaken por import. Somente os primitivos importados pelo código dos desafios entram no bundle.
- **Reset de estilos globais** — Substituir os tokens `:root` de marca vai quebrar os estilos visuais atuais do home. Isso é esperado e intencional: o home será redesenhado com os tokens Untitled UI.

## Questões em aberto

- O redesign do home exige algum token fora do conjunto Untitled UI padrão? Se sim, adicionar como extensão no mesmo bloco `@theme`, nunca como override separado.
