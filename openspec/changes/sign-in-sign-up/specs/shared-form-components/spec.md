## ADDED Requirements

### Requirement: Componente TextInput

O sistema SHALL fornecer um componente `TextInput` com suporte a 6 estados visuais distintos: normal, preenchido com foco, desabilitado, erro, erro preenchido, erro com foco. O componente SHALL expor props para `label`, `error`, `id`, e todos os atributos nativos de `<input>`.

#### Scenario: Estado de erro
- **WHEN** a prop `error` é passada com uma string não vazia
- **THEN** o campo exibe borda e ícone de erro, e a mensagem de erro é renderizada abaixo do campo com `aria-describedby`

#### Scenario: Estado desabilitado
- **WHEN** a prop `disabled` é `true`
- **THEN** o campo tem opacidade reduzida e não aceita interação

#### Scenario: Acessibilidade
- **WHEN** o componente é renderizado
- **THEN** o `<label>` está associado ao `<input>` via `htmlFor`/`id`, e erros usam `aria-describedby`

### Requirement: Componente Button

O sistema SHALL fornecer um componente `Button` com variantes `primary` e `secondary`, e estados normal, hover, foco e desabilitado. SHALL aceitar prop `loading` que exibe indicador de carregamento e desabilita o botão.

#### Scenario: Estado loading
- **WHEN** a prop `loading` é `true`
- **THEN** o botão exibe spinner/indicador e `disabled` é aplicado automaticamente

#### Scenario: Navegação por teclado
- **WHEN** o botão recebe foco via Tab
- **THEN** `:focus-visible` é estilizado claramente (nunca `outline: none` sem alternativa)

### Requirement: Componente PasswordInput

O sistema SHALL fornecer um `PasswordInput` baseado em `TextInput` com toggle de visibilidade da senha acessível via ícone clicável.

#### Scenario: Toggle de visibilidade
- **WHEN** o usuário clica no ícone de olho
- **THEN** o input alterna entre `type="password"` e `type="text"`

#### Scenario: Acessibilidade do toggle
- **WHEN** o ícone de toggle é renderizado
- **THEN** ele possui `aria-label` descritivo ("Mostrar senha" / "Ocultar senha") e é acionável via teclado

### Requirement: Componente FormField

O sistema SHALL fornecer um componente `FormField` que envolve `TextInput` com label, mensagem de erro e hint text. É o building block para todos os campos de formulário nos desafios 1–9.

#### Scenario: Renderização com erro
- **WHEN** a prop `error` é passada
- **THEN** o `FormField` repassa o erro ao `TextInput` e renderiza a mensagem abaixo do campo

### Requirement: Componente Checkbox

O sistema SHALL fornecer um `Checkbox` acessível com estados normal, foco e desabilitado, tanto para marcado quanto desmarcado. SHALL usar `role="checkbox"` e `aria-checked`.

#### Scenario: Estados de acessibilidade
- **WHEN** o checkbox é renderizado
- **THEN** `aria-checked` reflete o estado atual (`true`/`false`) e o estado de foco é visualmente distinguível

### Requirement: Componente Toast

O sistema SHALL fornecer um componente `Toast` para exibir notificações de erro não específicas de campo. SHALL usar `aria-live="assertive"` para anunciar mensagens a leitores de tela.

#### Scenario: Exibição de mensagem de erro
- **WHEN** uma server function retorna erro (conta existente, credenciais inválidas, ToS não aceito)
- **THEN** o Toast é exibido com a mensagem de erro e `aria-live="assertive"` anuncia para leitores de tela

#### Scenario: Dispensa do Toast
- **WHEN** o usuário fecha o Toast ou inicia nova submissão
- **THEN** o Toast é removido da UI

### Requirement: Componente PasswordChecklist

O sistema SHALL fornecer um componente `PasswordChecklist` que recebe o valor atual da senha e exibe os 5 critérios com ícones de estado (normal / atendido).

#### Scenario: Atualização em tempo real
- **WHEN** o valor da senha muda
- **THEN** cada critério é reavaliado e o ícone atualiza imediatamente sem debounce
