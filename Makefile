# Define variáveis para comandos comuns
DOCKER_COMPOSE = docker compose
NPM = npm

# Targets
.PHONY: all up dev lint test clean

all: up

app: ## Sobe os containers da aplicação em modo de desenvolvimento.
	@echo "\n #### Iniciando os containers do projeto... ####\n"
	$(DOCKER_COMPOSE) up --build -V

down: ## Derruba os containers da aplicação.
	@echo "\n #### Parando os containers do projeto... ####\n"
	$(DOCKER_COMPOSE) down

dev: ## Inicia o servidor de desenvolvimento diretamente (sem Docker).
	@echo "\n #### Iniciando o servidor de desenvolvimento... ####\n"
	$(NPM) run dev

lint: ## Executa a verificação de código com ESLint.
	@echo "\n #### Executando o prettier... ####\n"
	$(NPM) run format
	@echo "\n #### Executando o lint... ####\n"
	$(NPM) run lint:fix

test: ## Roda os testes do projeto.
	@echo "\n #### Executando os testes... ####\n"
	$(NPM) run test