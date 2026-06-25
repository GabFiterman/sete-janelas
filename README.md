# Sete Janelas - Web Operating System Simulator

<div align="center">
  <img src="https://img.shields.io/github/v/release/GabFiterman/sete-janelas?style=for-the-badge&label=Vers%C3%A3o&color=blueviolet" alt="Versão" />
  <img src="https://img.shields.io/github/last-commit/GabFiterman/sete-janelas?style=for-the-badge&label=Atualizado&color=blue" alt="Last Commit" />
  <img src="https://img.shields.io/github/repo-size/GabFiterman/sete-janelas?style=for-the-badge&label=Tamanho&color=success" alt="Repo Size" />
  <img src="https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow?style=for-the-badge" alt="Status" />
  <br>
  <br>
  <img src="https://img.shields.io/badge/react-19-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" alt="SASS" />
  <br>
  <img src="https://img.shields.io/badge/State_Man.-Zustand-orange?style=for-the-badge&logo=redux&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/Motion-Framer-black?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Tests-Vitest-yellow?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
</div>

<br>

<table>
  <tr>
    <td><img width="1920" alt="Sete Janelas Desktop Aero Glass" src="https://github.com/user-attachments/assets/44c1c431-0553-44b5-af64-8ac6c23c9968" /></td>
    <td><img width="1920" alt="Sete Janelas File Explorer" src="https://github.com/user-attachments/assets/ed98249d-2a6d-4497-93e1-623de9db99b5" /></td>
  </tr>
</table>

## O Conceito

O **Sete Janelas** é um simulador de sistema operacional de alta fidelidade desenvolvido como portfólio interativo. Inspirado na estética **Aero Glass** do Windows 7, ele transpõe a barreira entre a navegação web passiva e a experiência funcional de desktop, fornecendo um ecossistema completo de multitarefa, manipulação de janelas, gerenciamento de processos simulado e um sistema de arquivos virtual em runtime.

---

## ⚙️ Arquitetura e Engenharia de OS na Web

O projeto foi projetado para demonstrar domínio prático do ecossistema front-end moderno, implementando conceitos de sistemas operacionais aplicados ao DOM.

### 1. O Kernel Simulado (Zustand State Manager)

O núcleo operacional da aplicação reside no [Zustand Kernel](src/store/uiStore.ts), que gerencia:

- **Ciclo de Vida das Janelas:** Abertura, fechamento, maximização, minimização e ordenação dinâmica com base em camadas de `zIndex` (trazendo o processo ativo para o topo).
- **Retenção de Estado Nativo:** Diferente de abordagens tradicionais que desmontam componentes ao minimizar (causando perda de progresso), as janelas do Sete Janelas são apenas ocultadas visualmente através de propriedades de estilos CSS. Isso preserva o estado de iframes ativos, players de áudio/vídeo e documentos no leitor de PDF (incluindo zoom e número da página atual).
- **Controle de Viewport:** Clamping de dimensões e coordenadas de janelas baseado na resolução da tela ativa do usuário, respeitando a barra de tarefas inferior.

### 2. Virtual File System (VFS)

Uma estrutura de dados em runtime simula um disco rígido tradicional (`C:/`):

- **Lookup por Chaves Normalizadas:** Para assegurar integridade nas buscas, as chaves internas do VFS são tratadas sem acentos e em caixa alta através do utilitário `normalizeStringForPath` (ex: `C:/USUARIOS/FITERMAN/MUSICAS` para a pasta física de `C:/Usuários/Fiterman/Músicas`).
- **Indexador de Arquivos:** Mapeia arquivos locais (`.webp`, `.mp4`, `.pdf`, `.txt`), atalhos de executáveis nativos (`.exe` com bindings diretos de chamada às stores do Zustand) e links de navegação externa.
- **Unified Global Search:** Uma ferramenta de busca fuzzy e accent-insensitive (`searchVFS`) varre a estrutura indexada para consultas instantâneas no File Explorer e Menu Iniciar.

### 3. Window Manager & Physics Engine

- **Framer Motion Integration:** Controle fluido de mounts, unmounts e transições contextuais. Ao minimizar, as janelas realizam uma animação em direção ao centro-inferior (taskbar). Ao fechar, o container reduz em escala migrando para o canto superior-direito.
- **Colisão de Ícones do Desktop (AABB):** Um motor básico de física por bounding-boxes previne sobreposição de ícones na grid da Área de Trabalho. Se o usuário arrastar um atalho e soltar por cima de outro, o VFS detecta a colisão AABB (Axis-Aligned Bounding Box) e reseta o offset físico através do incremento do estado de `dragVersion`.

### 4. Mitigação de Memory Leaks & Race Conditions

- Controle estrito de carregamento de assets assíncronos no Media Center e PDF Reader.
- Utilização de referências a timers e funções de limpeza (cleanup de efeitos) para prevenir que atualizações de estados ocorram em componentes desmontados da árvore do React.

### 5. Layout Pocket (Mobile Touch Optimization)

Uma adaptação exclusiva adapta a experiência para dispositivos móveis:

- Quando o hook `useIsMobile()` é acionado, todas as janelas do sistema abrem auto-maximizadas.
- O redimensionamento e as alças de arrastar são removidos de forma limpa, e os controles do File Explorer e atalhos da Área de Trabalho escalam para alvos de toque amigáveis (touch targets).

---

## 🚀 Funcionalidades Atuais

- **File Explorer:** Navegação estruturada de pastas com barra de endereços reativa, histórico (voltar/avançar), miniaturas de imagens dinâmicas e painel lateral de atalhos rápidos.
- **Acrobat Reader:** Leitor de PDFs nativo com paginação, carregamento sob demanda (lazy render) e controle de zoom inteligente.
- **Notepad:** Editor de texto simples para leitura de arquivos Markdown (`.md`) e de texto puro (`.txt`).
- **Media Center:** Reprodutor de vídeos e visualizador de imagens estruturado.
- **Unified Search:** Busca global baseada no VFS, acessível instantaneamente pelo Menu Iniciar e File Explorer.

---

## 🛠️ Instalação, Execução e Suíte de Testes

O projeto suporta execução nativa e via contêineres Docker (método recomendado para garantir consistência de ambiente).

### 🐳 Método Recomendado (Docker & Makefile)

Certifique-se de ter o **Docker** e o **Docker Compose** instalados em sua máquina.

```bash
# 1. Clone o repositório
git clone https://github.com/gabfiterman/sete-janelas.git

# 2. Inicie a aplicação em modo de desenvolvimento (Docker)
make app

# 3. Se precisar reconstruir a imagem do Docker (ex: novas dependências)
make app-rebuild

# 4. Para derrubar os containers do projeto
make down
```

### 💻 Método Local (Sem Docker)

#### Pré-requisitos

- `Node.js (v18+)`
- `npm`

```bash
# 1. Instale as dependências locais
npm install

# 2. Execute o servidor de desenvolvimento local
npm run dev # ou usando o Makefile: make dev
```

### 🧪 Execução de Testes

O projeto utiliza **Vitest** e **React Testing Library** para testes automatizados.

```bash
# Executar a suíte de testes (com watch ativo)
npm run test # ou usando o Makefile: make test

# Executar a suíte de testes de forma única (Single Run)
npm run test -- --run
```

### 📦 Compilação de Produção

```bash
# Compilar TypeScript e gerar pacote otimizado de produção
npm run build
```

---

## 🔄 Fluxo de Trabalho Git & Integração Contínua (CI)

A governança de código e entregas segue diretrizes modernas documentadas detalhadamente em [.agents/rules/release-and-changelog.md](.agents/rules/release-and-changelog.md):

### 1. Estratégia de Branches (Gitflow Adaptado)

- `develop`: Branch de integração principal. Todo o desenvolvimento ativo de novas features e correções ocorre aqui.
- `main`: Branch de produção. Armazena códigos estáveis com tags de versionamento.
- `release/vX.Y.Z`: Branch temporária criada a partir de `develop` para consolidação de lançamentos, fechamento do CHANGELOG e build final.

### 2. Padrão de Commits

Seguimos a convenção de **Conventional Commits** atrelados ao ID da issue do GitHub:

```
#<id_da_issue> <type>: <descrição em inglês>

Exemplo:
#61 docs: refactor readme and integrate github actions ci workflow
```

Tipos aceitos: `feat`, `fix`, `chore`, `style`, `refactor`, `docs`, `test`.

### 3. Automação (GitHub Actions CI)

A cada push ou pull request direcionado a `develop` ou `main`, o pipeline de CI do GitHub Actions é disparado para validar:

- Instalação limpa de pacotes.
- Validação estática de regras com **ESLint**.
- Execução completa da suíte de testes do **Vitest**.
- Compilação sem erros através do compilador TypeScript (`tsc`) e build do **Vite**.

---

## 👨‍💻 Autor

**Gabriel Fiterman** - _Product-Oriented Software Engineer_

Desenvolvedor Full Stack focado na intersecção entre alta performance de engenharia de software e design gráfico impecável.

[LinkedIn](https://www.linkedin.com/in/gabfiterman/) • [GitHub](https://github.com/GabFiterman)
