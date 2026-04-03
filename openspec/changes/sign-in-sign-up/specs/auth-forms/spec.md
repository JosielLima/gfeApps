## ADDED Requirements

### Requirement: Validação de e-mail no Sign Up

O sistema SHALL validar o campo de e-mail no cadastro com dois triggers distintos: no submit (campo vazio) e no blur (formato inválido).

#### Scenario: Campo vazio no submit
- **WHEN** o usuário submete o formulário com o campo de e-mail vazio
- **THEN** o sistema exibe erro inline "O endereço de e-mail é obrigatório."

#### Scenario: Formato inválido no blur
- **WHEN** o usuário preenche o e-mail com formato inválido e remove o foco do campo
- **THEN** o sistema exibe erro inline "Por favor, insira um endereço de e-mail válido."

#### Scenario: E-mail válido
- **WHEN** o usuário preenche e-mail no formato `user@example.com`
- **THEN** nenhum erro é exibido

### Requirement: Checklist de complexidade de senha em tempo real

O sistema SHALL validar a senha do Sign Up em tempo real, exibindo um checklist visual com 5 critérios. Cada critério SHALL ter ícone no estado normal (não atendido) e ativo (atendido).

Critérios:
- 8–64 caracteres
- Pelo menos uma letra maiúscula
- Pelo menos uma letra minúscula
- Pelo menos um número
- Pelo menos um caractere especial (ex: `! @ # $ % ^ & *`)

#### Scenario: Critério atendido em tempo real
- **WHEN** o usuário digita um caractere que satisfaz um critério
- **THEN** o ícone daquele critério muda imediatamente do estado normal para o ativo

#### Scenario: Critério não atendido no submit
- **WHEN** o usuário submete o formulário com critérios de senha não atendidos
- **THEN** o sistema exibe mensagem "A senha deve conter [critério]" para cada critério pendente

#### Scenario: Campo de senha vazio no submit
- **WHEN** o usuário submete o formulário com o campo de senha vazio
- **THEN** o sistema exibe "A senha é obrigatória."

### Requirement: Checkbox de Termos de Serviço

O sistema SHALL exigir que o usuário marque o checkbox de ToS antes de completar o cadastro.

#### Scenario: Checkbox não marcado no submit
- **WHEN** o usuário submete o formulário de cadastro sem marcar o checkbox de ToS
- **THEN** o sistema exibe toast de erro "Você deve concordar com os Termos de Serviço para criar uma conta."

#### Scenario: Checkbox marcado
- **WHEN** o usuário marcou o checkbox de ToS e o resto do formulário é válido
- **THEN** o formulário prossegue para validação server-side

### Requirement: Validação de campos no Sign In

O sistema SHALL validar os campos de e-mail e senha no Sign In apenas no submit.

#### Scenario: Campo de e-mail vazio no submit
- **WHEN** o usuário submete o Sign In com e-mail vazio
- **THEN** o sistema exibe "O e-mail é obrigatório."

#### Scenario: Campo de senha vazio no submit
- **WHEN** o usuário submete o Sign In com senha vazia
- **THEN** o sistema exibe "A senha é obrigatória."

### Requirement: Estados do formulário durante submissão

O sistema SHALL comunicar o estado de carregamento durante a submissão de qualquer formulário.

#### Scenario: Submissão em andamento
- **WHEN** o formulário é submetido e aguarda resposta do servidor
- **THEN** o botão de submit exibe estado de loading e fica desabilitado para evitar duplo envio

#### Scenario: Erro de servidor
- **WHEN** a server function retorna um erro (conta existente, credenciais inválidas)
- **THEN** um toast de erro é exibido e o formulário retorna ao estado normal (botão habilitado)
