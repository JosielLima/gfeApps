## ADDED Requirements

### Requirement: Cadastro de usuário

O sistema SHALL permitir que novos usuários se cadastrem com e-mail e senha. O e-mail SHALL ser normalizado para lowercase antes do armazenamento. A senha SHALL ser armazenada como hash bcrypt com work factor 12. Um token de sessão SHALL ser criado imediatamente após o cadastro bem-sucedido.

#### Scenario: Cadastro com dados válidos
- **WHEN** o usuário submete o formulário de cadastro com e-mail válido, senha que atende todos os critérios e checkbox de ToS marcado
- **THEN** o sistema cria o usuário no banco, cria uma sessão, define o cookie HTTP-only e redireciona para `/apps/sign-in-sign-up/welcome`

#### Scenario: E-mail já cadastrado
- **WHEN** o usuário tenta se cadastrar com um e-mail que já existe no banco (comparação case-insensitive)
- **THEN** o sistema retorna um toast de erro "A conta já existe. Fazer login em vez disso?" sem criar nenhum registro

#### Scenario: E-mail normalizado antes do armazenamento
- **WHEN** o usuário submete e-mail com letras maiúsculas (ex: `User@Example.com`)
- **THEN** o sistema armazena `user@example.com` no banco

### Requirement: Login de usuário

O sistema SHALL autenticar usuários existentes via e-mail e senha. A verificação SHALL usar `bcrypt.compare`. Em caso de falha de autenticação, a mensagem de erro SHALL ser genérica para prevenir user enumeration.

#### Scenario: Login com credenciais válidas
- **WHEN** o usuário submete e-mail e senha corretos
- **THEN** o sistema cria uma sessão, define o cookie HTTP-only e redireciona para `/apps/sign-in-sign-up/welcome`

#### Scenario: Credenciais inválidas
- **WHEN** o usuário submete e-mail inexistente ou senha incorreta
- **THEN** o sistema exibe toast de erro "E-mail ou senha incorretos." sem revelar se o e-mail existe

### Requirement: Gerenciamento de sessão

O sistema SHALL manter sessões de usuário via cookie HTTP-only com token de 256 bits gerado por `crypto.randomBytes(32)`. O token SHALL ser armazenado na tabela `sessions` com `expires_at` de 7 dias. O cookie SHALL ter atributos `HttpOnly`, `Secure` (produção), `SameSite=Lax`, `Path=/`, `Max-Age=604800`.

#### Scenario: Verificação de sessão em rota protegida
- **WHEN** um usuário autenticado acessa `/apps/sign-in-sign-up/welcome`
- **THEN** o `beforeLoad` da rota lê o cookie, valida o token no banco e injeta os dados do usuário no contexto da rota

#### Scenario: Acesso sem sessão válida
- **WHEN** um usuário sem sessão (ou com sessão expirada) tenta acessar uma rota protegida
- **THEN** o sistema redireciona para `/apps/sign-in-sign-up`

### Requirement: Logout

O sistema SHALL permitir que o usuário encerre sua sessão. O token SHALL ser removido da tabela `sessions` e o cookie SHALL ser invalidado.

#### Scenario: Logout bem-sucedido
- **WHEN** o usuário aciona o logout
- **THEN** a sessão é deletada do banco, o cookie é limpo e o usuário é redirecionado para `/apps/sign-in-sign-up`

### Requirement: Página de boas-vindas autenticada

O sistema SHALL exibir uma página de boas-vindas com o e-mail do usuário autenticado para confirmar que o fluxo completo funciona.

#### Scenario: Exibição de dados do usuário
- **WHEN** o usuário é redirecionado para `/apps/sign-in-sign-up/welcome` após cadastro ou login
- **THEN** a página exibe "Bem-vindo de volta, [email do usuário]"
