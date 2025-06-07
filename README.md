# Case para posição de Frontend Developer na Moray

Você foi alocado em um projeto para finalizar uma tarefa pendente de um outro desenvolvedor que precisou deixar o time. Esse projeto **é uma aplicação frontend criada com o propósito de exibir a evolução populacional dos bairros de uma cidade**.

Os dados são fornecidos por meio de dois endpoints de uma API que já foi desenvolvida e deve ser consumida por esse frontend.

Tenha em mente que temos apenas 1h para finalizar essa pendência. O objetivo é entregar um MVP, não é momento para se preocupar tanto com UI. Entretanto, tem que fazer sentido para o usuário.

## Endpoints

- GET /bairros-geojson
- GET /populacao

_(Essa API fica disponível assim que você roda o projeto localmente e você pode visualizar um exemplo de resposta na pasta `src/backend/`)._

## Tarefas pendentes:

1. O usuário da aplicação deve conseguir visualizar no mapa a demarcação (geometria) de cada bairro.
2. O usuário da aplicação deve conseguir visualizar a evolução populacional do bairro que ele escolher.

## Rodando a aplicação localmente

Certifique-se de que você tenha o Node 18 instalado (`node -v`). Caso não, você pode fazer isso utilizando o [nvm](https://github.com/nvm-sh/nvm#installing-and-updating). Na raiz do projeto, execute:

```
nvm install
nvm use
```

Depois, rode a aplicação com:

```
npm run dev
```

## Repositório

https://bitbucket.org/morayai/case-frontend-react

## Configurações do projeto (VsCode)

Use a extensão do Prettier para gerar auto formatação. Coloque este trecho no seu Workspace (JSON):

```
{
  "editor.formatOnSave": true
}
```
