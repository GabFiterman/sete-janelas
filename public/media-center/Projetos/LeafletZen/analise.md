# Leaflet-Zen: Painel Geográfico de Alta Performance

Este projeto é uma simulação de dashboard geográfico derivado diretamente da minha experiência como responsável de frontend no Nimbus Meteorologia. O foco principal foi gerenciar estados massivos e plotagem dinâmica de dados sobre mapas em tempo real.

### Pontos de Destaque Técnico:

- **Arquitetura Escalável (Redux + TS)**: Gestão de estados globais previsíveis (configurações do mapa, pontos de interesse, camadas de clima) de forma totalmente type-safe.
- **Renderização Sob Demanda**: Implementação de renderização condicional que simula mapas complexos sem perda de frames, otimizando o carregamento da aplicação em até 40%.
- **Manipulação Vetorial**: Integração fina de ferramentas de desenho vetorial (como áreas de alerta e perímetros geográficos) permitindo interação fluida no navegador.
- **Clean Code & DX**: Estrutura modular organizada com Atomic Design e hooks customizados.
