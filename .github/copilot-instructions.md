# Configurações do Copilot (Hooks e Pós-Edição)

Esta seção atua como um pre-hook e post-hook para as ações do Copilot (e Cursor, se importado).

## 🚀 Post-Tool Use / Post-Fix

Sempre que o bot concluir a modificação, refatoração, criação ou deleção de um código fonte TypeScript ou TSX (extensões `*.tsx`, `*.ts`):

1. **Obrigatório**: Rode o comando a seguir no terminal antes de notificar o usuário que a tarefa terminou:
   ```bash
   pnpm typecheck
   ```
2. Caso o comando resulte em **erro**, você NÃO pode considerar a tarefa concluída. **Corrija** o erro encontrado antes de prosseguir.
3. Se finalizado o workflow e o comando falhar, forneça a correção antes de finalizar o prompt.

Essas regras complementam o comportamento estruturado do JSON definido também na pasta `hooks/`.
