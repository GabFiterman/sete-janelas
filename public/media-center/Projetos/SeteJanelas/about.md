# Sete Janelas: O Sistema Operacional Web

Este portfólio simula o comportamento interativo e multitarefa de um desktop real no navegador. Ele foi projetado do zero para atuar como o ápice técnico do meu trabalho atual.

### Desafios de Engenharia Resolvidos

- **Zustand Kernel**: Centralização da lógica de controle de processos, regulando ciclos de vida de janelas (abrir, minimizar, maximizar, fechar) e z-index em camadas dinâmicas de renderização.
- **Virtual File System (VFS)**: Estruturação de um sistema de arquivos virtual completo baseado em caminhos absolutos (`C:/...`), permitindo busca indexada e execução de apps com base em extensões (.exe, .pdf, .md, .webp).
- **Aero Design System**: Desenvolvimento visual em SCSS inspirado no Windows 7 com efeito Aero Glass e transições de tela dinâmicas via Framer Motion.
- **Windows 7 Pocket (Mobile)**: Adaptação responsiva customizada para dispositivos móveis que maximiza janelas de forma nativa e ajusta a usabilidade para toques sem uso de estilos redundantes.
