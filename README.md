# Teste Moray

## Sobre

Você foi alocado em um projeto para finalizar uma tarefa pendente de um outro desenvolvedor que precisou deixar o time. Esse projeto **é uma aplicação frontend criada com o propósito de exibir a evolução populacional dos bairros de uma cidade**.

Os dados são fornecidos por meio de dois endpoints (GET /bairros-geojson; GET /populacao) de uma API que já foi desenvolvida e deve ser consumida por esse frontend.

### Etapa 1 (Concluído)

1. O usuário da aplicação deve conseguir visualizar no mapa a demarcação (geometria) de cada bairro.
2. O usuário da aplicação deve conseguir visualizar a evolução populacional do bairro que ele escolher.

Tenha em mente que temos apenas 1h para finalizar essa pendência. O objetivo é entregar um MVP, não é momento para se preocupar tanto com UI. Entretanto, tem que fazer sentido para o usuário.

### Etapa 2

Evoluir o MVP da etapa 1 para melhor atender o cliente e corrigir e estruturar o código da melhor maneira.

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

### Outros comandos

- `npm run dev` - Inicializa o servidor de desenvolvimento
- `npm run build` - Compila o projeto para a pasta `dist`
- `npm run test` - Roda o suíte de testes
- `npm run preview` - Roda o projeto como se fosse em produção, baseado no build gerado na pasta `dist`
- `npm run lint` - Roda o linter do projeto
- `npm run format` - Roda o formatador `prettier`

## Repositório do template

https://bitbucket.org/morayai/case-frontend-react

## Configurações do projeto (VsCode) (Opcional)

Use a extensão do Prettier para gerar auto formatação ao salvar.

## Estrutura

```
moray
├── public
├── src
│   ├── assets                      # Guarda as configurações/mocks dos testes
|   |   ├── styles                  # Arquivos de estilização global e tema
│   ├── backend                     # Arquivos que simulam a API
│   ├── components                  # Componentes que compõe a aplicação
│   ├── lib                         # Componentes reutilizáveis do "Design System"
│   ├── test                        # Guarda as configurações dos testes
│   ├── App.tsx
│   └── main.tsx
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── .nvmrc
├── package.json
├── README.md
├── plano.md
└── vite.config.js
```

## Construído com

- React – Biblioteca JavaScript para construção de interfaces de usuário reativas e componentizadas.
- SCSS – Extensão do CSS que adiciona recursos como variáveis, mixins e aninhamento, facilitando a organização e manutenção dos estilos.
- Axios – Cliente HTTP baseado em Promises para fazer requisições a APIs de forma simples e eficiente.
- React Leaflet – Biblioteca que integra o Leaflet ao React, permitindo renderizar mapas interativos e camadas geográficas como componentes React.
- Recharts – Biblioteca de gráficos baseada em componentes React, ideal para visualização de dados de forma simples e customizável.
- Turf – Biblioteca JavaScript para análise e manipulação de dados geoespaciais, oferecendo funções para operações com polígonos, cálculo de distâncias, detecção de vizinhança, entre outras tarefas de geoprocessamento no frontend.
- Testing Library – Ferramenta para testes de componentes React focada na experiência do usuário, promovendo boas práticas de testes.
- Eslint – Ferramenta de linting para identificar e corrigir problemas de estilo e possíveis erros em código JavaScript/TypeScript.
- Prettier – Formatador de código automático que garante um padrão consistente de formatação em todo o projeto.
- Vitest – Framework de testes rápido e moderno, inspirado no Jest, com integração nativa ao Vite.
- Vite – Ferramenta de build e desenvolvimento frontend extremamente rápida, que utiliza ESBuild e oferece HMR eficiente.
