# Sete Janelas - Web Operating System

<div align="center">
  <img src="https://img.shields.io/github/v/release/GabFiterman/s7te-janelas?style=for-the-badge&label=Vers%C3%A3o&color=blueviolet" alt="Versão" />
  <img src="https://img.shields.io/github/last-commit/GabFiterman/s7te-janelas?style=for-the-badge&label=Atualizado&color=blue" alt="Last Commit" />
  <img src="https://img.shields.io/github/repo-size/GabFiterman/s7te-janelas?style=for-the-badge&label=Tamanho&color=success" alt="Repo Size" />
  <img src="https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow?style=for-the-badge" alt="Status" />

  <br>
  <br>

  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" alt="SASS" />
  
  <br>

  <img src="https://img.shields.io/badge/State_Man.-Zustand-orange?style=for-the-badge&logo=redux&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/Motion-Framer-black?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</div>

<table>
  <tr>
    <td><img width="1920" height="959" alt="image" src="https://github.com/user-attachments/assets/44c1c431-0553-44b5-af64-8ac6c23c9968" /></td>
    <td><img width="1920" height="959" alt="image" src="https://github.com/user-attachments/assets/ed98249d-2a6d-4497-93e1-623de9db99b5" /></td>
  </tr>
</table>

## 🖥️ O Conceito

O Sete Janelas não é apenas um portfólio; é uma simulação de sistema operacional via web, projetada para quebrar a barreira entre a navegação passiva e a interação funcional.

A proposta é oferecer diferentes "janelas" ou perspectivas sobre minha atuação profissional, onde cada seção reflete uma faceta da minha intersecção entre Engenharia de Software e Design Gráfico. É a materialização da tese de que código robusto e estética não competem, mas se potencializam.

## ⚙️ Arquitetura e Engenharia

Este projeto foi construído para demonstrar autonomia e domínio do ecossistema JavaScript moderno, simulando comportamentos complexos de sistemas operacionais nativos dentro do DOM.

## Destaques Técnicos

- **Kernel Simulado** (Zustand): Implementação de uma Store centralizada que atua como o núcleo do sistema, orquestrando janelas, gerenciamento de processos (z-index, foco, minimização) e estado global sem prop drilling.
- **Virtual File System (VFS)**: Arquitetura de dados baseada em grafos para simular diretórios, permitindo navegação real (`C:/Users/...`), histórico e mapeamento de assets estáticos e dinâmicos.
- **Window Manager & Singleton Pattern**: Sistema de janelas inteligente que previne múltiplas instâncias de aplicações únicas e gerencia o ciclo de vida (mount/unmount) e hierarquia visual.
- **Race Condition Mitigation**: Tratamento rigoroso de operações assíncronas (especialmente no Media Center) utilizando refs e cleanup functions para evitar atualizações de estado em componentes desmontados durante o carregamento de assets locais e remotos.
- **Design System Atômico**: UI proprietária construída com SASS/SCSS modular, sem dependência excessiva de bibliotecas de componentes externas.

## 🚀 Funcionalidades (v1.0)

### 📂 File Explorer

Navegação completa por diretórios, suporte a histórico (voltar/avançar), barra de endereços funcional e visualização de ícones dinâmicos baseados no tipo de arquivo.

### 📺 Media Center

Player de vídeo e visualizador de imagens com suporte a playlists, controles de reprodução e tratamento de loading states para assets pesados.

### 🪟 Window Management

- **Drag & Drop**: Janelas arrastáveis com restrições de viewport.
- **Multitarefa**: Minimização, Maximização e Foco dinâmico.
- **Taskbar**: Menu Iniciar e gerenciamento de janelas ativas.

## 🛠️ Instalação e Execução

- **Pré-requisitos**: `Node.js (v18+)`

```Bash
# 1. Clone o repositório
git clone https://github.com/gabfiterman/sete-janelas.git

# 2. Instale as dependências
npm install

# 3. Execute em modo de desenvolvimento
npm run dev
```

## 🗺️ Roadmap de Evolução

### **Versão Atual**:

`v1.0` (_MVP Estável_) Transparência no desenvolvimento: Priorizo a entrega contínua de valor e a evolução incremental da arquitetura.

### **🚀 Core & Arquitetura**

- [ ] **Persistência de Sessão**: Implementar salvamento de estado das janelas abertas e posição dos ícones via LocalStorage ou IndexedDB.
- [ ] **Multitarefa Real**: Refatorar processos pesados para Web Workers.
- [ ] **Sistema de Temas**: Migrar variáveis SCSS para CSS Variables dinâmicas (Dark/Light Mode).

### **📦 Aplicações & Features**

- [ ] **Terminal Emulator**: Implementar um terminal interativo (bash-like).
- [ ] **Mecânica de Drag-and-Drop Global**: Permitir arrastar arquivos do File Explorer para o Desktop.

### **🛠️ DX & Qualidade**

- [ ] **Testes E2E** (Cypress): Automatizar fluxos críticos de abertura e fechamento de janelas.
- [ ] **Bundle Splitting**: Lazy loading de aplicações (Code Splitting por rota/componente).

## 👨‍💻 Autor

**Gabriel Fiterman** - _Product-Oriented Software Engineer_

Desenvolvedor Full Stack focado na intersecção entre alta performance técnica e experiência de usuário excepcional.

[LinkedIn](https://www.linkedin.com/in/gabfiterman/) • [GitHub](https://github.com/GabFiterman)

> _Feito com 💙 e muito café._
