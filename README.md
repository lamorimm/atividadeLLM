# Gerador de Histórias com LLM

Este projeto é uma aplicação Node.js que gera histórias usando um modelo de linguagem grande (LLM) da Google Gemini.

## Como Usar

### 1. Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
LLM_API_KEY=SUA_CHAVE_API_GEMINI
LLM_API_URL=https://generativelanguage.googleapis.com/v1beta
LLM_MODEL="gemini-2.0-flash"
```

Substitua `SUA_CHAVE_API_GEMINI` pela sua chave de API do Google Gemini.

### 2. Instalação das Dependências

Certifique-se de ter o Node.js instalado. Em seguida, instale as dependências do projeto:

```bash
npm install
```

### 3. Iniciar o Servidor

Execute o seguinte comando para iniciar a aplicação:

```bash
node app.js
```

O servidor estará rodando em `http://localhost:3000`.

### 4. Testar a API

Envie uma requisição POST para `http://localhost:3000/generate-story` com um corpo JSON contendo o `theme` da história.

**Exemplo usando Postman ou cURL:**

```json
{
  "theme": "Um detetive em uma cidade futurista"
}
```

Você receberá uma resposta JSON com a história gerada.
