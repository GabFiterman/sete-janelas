# Usa uma imagem oficial do Node.js mais leve (slim) para diminuir o tamanho e acelerar o download/inicializacao
FROM node:22-slim

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de dependência primeiro para aproveitar o cache
# Esta camada só será reconstruída se package.json ou package-lock.json mudarem
COPY package*.json ./

# Instala todas as dependências usando npm ci (mais rápido e limpo para ambientes automatizados/Docker)
RUN npm ci --ignore-scripts

# Expõe a porta de desenvolvimento do Vite
EXPOSE 5173

# Comando padrão para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]
