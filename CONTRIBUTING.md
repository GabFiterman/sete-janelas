# Guia de Contribuição e Fluxo Git

Este documento descreve o fluxo de trabalho (workflow) de desenvolvimento, padronização de commits, gerenciamento de branches e o processo de geração de releases adotados no projeto **Sete Janelas**.

---

## 1. Estratégia de Branches

Adotamos uma versão simplificada do Gitflow, garantindo uma linha do tempo limpa e entregas robustas:

- **`develop`**: Branch de integração principal. Todo o desenvolvimento ativo ocorre aqui. É a base para a criação de novas branches.
- **`main`**: Branch de produção. Armazena apenas o código estável de produção. Cada merge na `main` é acompanhado por uma tag correspondente (`vX.Y.Z`).
- **`feature/issue-NN`**: Criada a partir de `develop` para desenvolver uma nova funcionalidade ou melhoria de estilo relacionada à issue `#NN`.
- **`fix/issue-NN`**: Criada a partir de `develop` para correção de bugs relacionados à issue `#NN`.
- **`chore/issue-NN`**: Criada a partir de `develop` para atualizações de infraestrutura, dependências ou documentação.
- **`release/vX.Y.Z`**: Branch temporária criada a partir de `develop` para preparar e consolidar uma nova release.

---

## 2. Padrão de Commits

Utilizamos o padrão de **Conventional Commits** em inglês, sempre referenciando o ID da issue do GitHub associada:

```
#<id_da_issue> <tipo>: <descrição sucinta em inglês>
```

### Tipos de commits aceitos:
- `feat`: Nova funcionalidade.
- `fix`: Correção de bug.
- `chore`: Tarefas de build, dependências ou configurações.
- `style`: Alterações de estilização, formatação e UI.
- `refactor`: Refatoração de código sem alteração de comportamento.
- `docs`: Alterações na documentação.
- `test`: Criação ou ajuste de testes unitários.

### Exemplo:
```bash
git commit -m "#61 docs: refactor readme, add unit tests and setup github actions"
```

---

## 3. Workflow de Desenvolvimento

### Passo 1: Iniciar uma Tarefa
1. Garanta que a sua issue está associada a uma **Milestone** no GitHub.
2. Atualize a branch `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   ```
3. Crie a branch da tarefa:
   ```bash
   git checkout -b feature/issue-NN  # ou fix/issue-NN, chore/issue-NN
   ```

### Passo 2: Desenvolver e Validar
1. Implemente as alterações e os testes correspondentes (se aplicável).
2. Valide localmente:
   ```bash
   npm run lint:check  # validação do linter
   npm run test        # execução de testes locais (Vitest)
   npm run build       # compilação do bundle de produção
   ```
3. Adicione e envie as alterações:
   ```bash
   git add .
   git commit -m "#NN type: description"
   git push origin feature/issue-NN
   ```

### Passo 3: Criar o Pull Request
- Abra um Pull Request da sua branch para a branch `develop`.
- O workflow de CI do GitHub Actions validará o código automaticamente.
- Após aprovação, realize o merge na branch `develop`.

---

## 4. Processo de Release (Geração de Nova Versão)

Quando todas as tarefas de uma Milestone forem integradas na branch `develop` e o projeto estiver pronto para uma nova versão:

### Passo 1: Criar a Branch de Release
```bash
git checkout develop
git pull origin develop
git checkout -b release/vX.Y.Z  # Ex: release/v1.2.0
```

### Passo 2: Atualizar a Versão e o Changelog
1. No arquivo `package.json`, altere o campo `"version"` para a nova versão (`"version": "X.Y.Z"`).
2. No arquivo `CHANGELOG.md`:
   - Renomeie a seção `## [Unreleased]` para `## [X.Y.Z] - YYYY-MM-DD` com a data atual.
   - Adicione uma nova seção `## [Unreleased]` (com as subseções `### Added`, `### Changed`, `### Fixed` vazias) logo acima.
3. Adicione e envie as alterações da release:
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore: release vX.Y.Z"
   git push origin release/vX.Y.Z
   ```

### Passo 3: Mesclar na Main e Taggear
1. Abra um Pull Request de `release/vX.Y.Z` para a branch `main`.
2. Após o merge no GitHub, atualize a branch `main` localmente e gere a tag correspondente:
   ```bash
   git checkout main
   git pull origin main
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```
3. Crie um **GitHub Release** a partir da tag criada, colando a seção da respectiva versão do `CHANGELOG.md` no corpo da publicação.

### Passo 4: Sincronizar com a Develop
- Faça o merge de `release/vX.Y.Z` de volta para a `develop` para manter o histórico de commits, a versão no `package.json` e o `CHANGELOG.md` sincronizados:
  ```bash
  git checkout develop
  git merge --no-ff release/vX.Y.Z
  git push origin develop
  ```
- Feche a Milestone concluída no GitHub.
