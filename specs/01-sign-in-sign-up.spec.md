# Especificação: 01-sign-in-sign-up

Neste desafio, você desenvolverá uma interface de autenticação de usuário segura e responsiva que permite aos usuários se registrarem e fazerem login usando e-mail e senha. Você deve construí-la usando os designs fornecidos para desktop, tablet e mobile.

Nós delineamos minuciosamente todas as especificações necessárias para construir seu próprio mecanismo de autenticação manualmente. Embora difícil, este desafio foi projetado para lhe dar uma compreensão mais profunda dos fluxos de autenticação.

Se desejar, você também pode se integrar a um serviço de autenticação externo para concluir este exercício, o que é muito útil para seus projetos no mundo real. Concluir o exercício manualmente uma vez e, em seguida, repeti-lo com integração, também reforçará o que você aprendeu com o desenvolvimento prático.

## Requisitos Funcionais

### 1. Campo de Senha
- Este campo deve mascarar a entrada da senha por padrão, exibindo os caracteres como asteriscos.
- Também deve incluir um ícone de alternância de visibilidade que altera a exibição da senha entre mascarada e texto simples.

### 2. Cadastro (Sign Up)
**Validação no lado do cliente (Client side)**
- **Obrigatório:** No envio, certifique-se de que o campo de e-mail não fique em branco. Caso contrário, exiba "O endereço de e-mail é obrigatório." (*Email address is required.*).
- **Verificação de formato:** Valide se o e-mail inserido corresponde ao formato de e-mail padrão (por exemplo, user@example.com), fornecendo feedback quando o campo for preenchido e perder o foco (blur). Caso contrário, exiba "Por favor, insira um endereço de e-mail válido." (*Please enter a valid email address.*).

**Validação de senha no lado do cliente**
- **Verificação de complexidade em tempo real:** Valide se a senha inserida atende aos requisitos em tempo real, marcando cada um deles:
  - **Critérios:**
    - 8 - 64 caracteres
    - Pelo menos uma letra maiúscula
    - Pelo menos uma letra minúscula
    - Pelo menos um número
    - Pelo menos um caractere especial (ex: ! @ # $ % ^ & *)
- **Ícones de verificação:** Implemente ícones de verificação nos estados ativo e normal. Quando um requisito de senha for atendido, o ícone deve ser alterado do estado normal para o ativo.
- No envio, se os requisitos de formato não forem atendidos, exiba "A senha deve conter [critério em minúsculas]" (*Password should contain [criteria]*).
- **Obrigatório:** No envio, o campo não deve estar vazio, exiba "A senha é obrigatória" (*Password is required.*).

**Validação da caixa de seleção (checkbox) obrigatória no lado do cliente**
- **Termos de serviço:** Verifique se o usuário marcou a caixa de seleção do contrato de Termos de Serviço. Caso contrário, exiba uma notificação toast de erro informando "Você deve concordar com os Termos de Serviço para criar uma conta." (*You must agree to the Terms of Service to create an account.*).

**Validação no lado do servidor (Server side)**
- **Mesmas verificações:** Repita as verificações acima no lado do servidor para garantir consistência.
- **Conta já existe:** Verifique se o e-mail já existe no banco de dados. Se sim, mostre uma notificação toast de erro informando "A conta já existe. Fazer login em vez disso?" (*Account already exists. Sign in instead?*).
- **[Meta extra] Validação de domínio:** Verifique se o nome de domínio do e-mail tem um registro MX (Mail Exchange) válido. Caso contrário, exiba "Este e-mail não existe" (*This email does not exist.*).

### 3. Login (Sign In)
**Validação no lado do cliente**
- **Obrigatório:** No envio, os campos não devem estar vazios, exiba "O e-mail é obrigatório" / "A senha é obrigatória" (*Email is required* / *Password is required*).

**Validação de credenciais de login**
- **Recuperar:** Ao enviar, recupere as credenciais armazenadas (senha com hash e salt, se usado) associadas ao e-mail fornecido do banco de dados.
- **Verificar:** A senha fornecida pelo usuário passa por hash usando a mesma função de hash e salt (se aplicável) da senha armazenada. Esse valor com hash é então comparado com a senha armazenada com hash.
- **Seguro:** Evite ataques de injeção de SQL. Algumas maneiras incluem usar consultas parametrizadas ou *prepared statements*.
- **Se a autenticação falhar:** Forneça uma mensagem de erro genérica sem revelar se já existe uma conta por meio de uma notificação toast de erro, exiba "E-mail ou senha incorretos." (*Incorrect email or password.*).

### 4. Gerenciamento de Sessão
**Tratamento de token de sessão**
- **Criar token:** Crie um token de sessão que seja criptograficamente seguro e gerado aleatoriamente para evitar ataques de roubo de sessão (*session hijacking*) e fixação.
- **Armazenar no navegador:** Mantenha a sessão do usuário armazenando esse token como um cookie no navegador do usuário. O cookie deve ser marcado com atributos como `HttpOnly`, `Secure`, `SameSite` e com expiração de sessão para evitar o roubo de sessão.

**Redirecionamento após o registro:**
- **Lado do servidor:** O redirecionamento deve acontecer no lado do servidor, geralmente por meio de um código de resposta HTTP 302.
- **Específico do usuário:** Recupere informações específicas do usuário do servidor usando o token de sessão para exibir um conteúdo relevante "Bem-vindo de volta, [endereço de e-mail do usuário]". Isso também serve como um método de verificação para garantir que seus processos de registro e login estejam funcionando corretamente, buscando com precisão os dados apropriados do usuário.

### 5. Armazenamento de Dados e Segurança
- **Criptografia de dados:** Use opções integradas no banco de dados de sua escolha para criptografar colunas confidenciais, como senhas ou informações pessoais.
- **Armazenamento de chaves:** As chaves de criptografia devem ser armazenadas com segurança. Use um serviço de gerenciamento de chaves dedicado para garantir que as chaves sejam armazenadas separadamente dos dados que elas criptografam.
- **Criptografia em trânsito:** As conexões de e para o banco de dados devem ser criptografadas usando TLS.
- **Strings de conexão seguras:** Use strings de conexão seguras que incluam parâmetros de criptografia e não deixe credenciais fixas no código (*hard-code*).

**Armazenamento seguro**
- **Hashing de senha:** Use um algoritmo de hash forte e adaptável projetado para senhas, como bcrypt, Argon2 ou PBKDF2.
- **Salting de senha:** Considere adicionar *salt* aos hashes para evitar ataques de *rainbow table*.
- **E-mails sem distinção entre maiúsculas/minúsculas:** Converta todos os e-mails para letras minúsculas antes de armazenar e comparar.
- **Armazenamento de sessão:** Armazene IDs de sessão e dados relacionados em um banco de dados ou em armazenamentos em memória (*in-memory*) como Redis (mais rápido). Configure-os para usar conexões criptografadas.

## Requisitos Gerais
- **Fidelidade ao design:** Procure seguir o design o mais fielmente possível. Todos os elementos do design devem estar presentes, usando a cor do texto, tamanho da fonte, peso da fonte, espaçamento, dimensões etc., especificados.
- **Interatividade:**
  - **Notificação Toast:** Este componente é usado para exibir mensagens de erro quando não é específico de nenhum campo de entrada.
  - **Checkbox (Caixa de seleção):** Implemente os estados normal, com foco (*focus*) e desabilitado para marcado e desmarcado, respectivamente.
  - **Estados de link / botão:** Implemente e estilize links e botões para refletir diferentes estados - normal, foco (*hover*), foco e desabilitado.
  - **Estados dos campos de entrada:** Implemente e estilize os campos de entrada para refletir diferentes estados - normal, preenchido com foco, desabilitado, erro, erro preenchido, erro com foco.
- **Compatibilidade entre navegadores:** Verifique se sua solução funciona para os principais navegadores, incluindo Chrome, Firefox e Safari.
- **[Meta extra] Otimização de desempenho:** Codifique buscando tempos de carregamento rápidos com técnicas eficientes de CSS e JavaScript.
- **[Meta extra] Acessibilidade e semântica:** Siga as práticas recomendadas de acessibilidade na web, como usar HTML semântico e atributos ARIA onde necessário e usar tags *alt* apropriadas para imagens.
