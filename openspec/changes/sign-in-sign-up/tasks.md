## 1. Dependências e Configuração

- [ ] 1.1 Instalar dependências: `pnpm add zod react-hook-form @hookform/resolvers better-sqlite3 bcryptjs uuid`
- [ ] 1.2 Instalar tipos: `pnpm add -D @types/better-sqlite3 @types/bcryptjs @types/uuid`
- [ ] 1.3 Criar `src/lib/db.ts` — instância singleton do `better-sqlite3` com criação das tabelas `users` e `sessions`
- [ ] 1.4 Adicionar `database.db` ao `.gitignore`

## 2. Server Functions de Autenticação

- [ ] 2.1 Criar `src/lib/auth.ts` — definir schema Zod de cadastro (email + senha com 5 critérios)
- [ ] 2.2 Implementar server function `signUp` — normalizar email, validar, checar duplicata, bcrypt hash, INSERT users, criar sessão, Set-Cookie + redirect
- [ ] 2.3 Implementar server function `signIn` — buscar user, bcrypt.compare, mensagem genérica em falha, criar sessão, Set-Cookie + redirect
- [ ] 2.4 Implementar server function `signOut` — deletar sessão do banco e limpar cookie
- [ ] 2.5 Criar `src/lib/session.ts` — server function `getSession` que lê o cookie e retorna dados do usuário ou null

## 3. Componentes Compartilhados

- [ ] 3.1 Criar `src/components/TextInput.tsx` — 6 estados visuais (normal, preenchido/foco, desabilitado, erro, erro preenchido, erro/foco), `aria-describedby` para erros
- [ ] 3.2 Criar `src/components/Button.tsx` — variantes `primary`/`secondary`, estados normal/hover/foco/desabilitado, prop `loading` com spinner
- [ ] 3.3 Criar `src/components/PasswordInput.tsx` — baseado em `TextInput`, toggle de visibilidade com `aria-label` "Mostrar/Ocultar senha"
- [ ] 3.4 Criar `src/components/PasswordChecklist.tsx` — exibe 5 critérios com ícones normal/ativo, atualiza em tempo real sem debounce
- [ ] 3.5 Criar `src/components/FormField.tsx` — wrapper com label, mensagem de erro e hint text
- [ ] 3.6 Criar `src/components/Checkbox.tsx` — estados normal/foco/desabilitado para marcado e desmarcado, `role="checkbox"` + `aria-checked`
- [ ] 3.7 Criar `src/components/Toast.tsx` — notificação de erro com `aria-live="assertive"`, dispensável

## 4. Rota Sign In / Sign Up

- [ ] 4.1 Criar `src/routes/apps/sign-in-sign-up/index.tsx` — página com tabs "Sign In" / "Sign Up"
- [ ] 4.2 Implementar formulário Sign Up com React Hook Form + Zod — campos email, senha, checkbox ToS
- [ ] 4.3 Conectar formulário Sign Up à server function `signUp` com estado de loading no botão
- [ ] 4.4 Implementar formulário Sign In com React Hook Form — campos email e senha, validação only-on-submit
- [ ] 4.5 Conectar formulário Sign In à server function `signIn` com estado de loading no botão
- [ ] 4.6 Integrar `PasswordChecklist` ao campo de senha do Sign Up (atualização em tempo real)

## 5. Rota de Boas-vindas Protegida

- [ ] 5.1 Criar `src/routes/apps/sign-in-sign-up/welcome.tsx` — exibe "Bem-vindo de volta, [email]"
- [ ] 5.2 Adicionar `beforeLoad` à rota welcome — chama `getSession()`, redireciona para index se não autenticado
- [ ] 5.3 Implementar botão de logout na página welcome — chama `signOut` e redireciona

## 6. Estilização e Acessibilidade

- [ ] 6.1 Aplicar design tokens do Tailwind v4 nos componentes (cores, espaçamentos, tipografia do `src/styles.css`)
- [ ] 6.2 Verificar `:focus-visible` em todos os componentes interativos (nunca `outline: none` sem alternativa)
- [ ] 6.3 Verificar contraste WCAG AA (4.5:1) nos estados de erro e texto auxiliar
- [ ] 6.4 Testar navegação completa por teclado no fluxo de Sign Up e Sign In
- [ ] 6.5 Verificar responsividade: desktop, tablet e mobile

## 7. Verificação Final

- [ ] 7.1 Testar fluxo completo de cadastro → welcome page → logout
- [ ] 7.2 Testar fluxo de login com credenciais válidas e inválidas
- [ ] 7.3 Verificar que cookie é `HttpOnly` (não acessível via `document.cookie` no console)
- [ ] 7.4 Verificar que senha incorreta retorna mensagem genérica (sem revelar existência de conta)
- [ ] 7.5 Executar `pnpm check` — zero erros de Biome (lint + format + imports)
- [ ] 7.6 Executar `pnpm build` — zero erros de TypeScript (`strict: true`)
