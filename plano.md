Minha intenção de como melhorar o projeto será através dos seguintes passos:

1. Separar o componente de mapa do App.jsx ✅
2. Utilizar uma biblioteca de gráficos para exibir claramente a evolução da população ✅
   a. Recharts. Justificavas: Feita para React, usa componentes React puros; Fácil de usar e customizar; Boa performance para dashboards e gráficos simples; Ótima compatibilidade com React 18+.
3. Alterar as cores das áreas escolhidas (caso a api mude o retorno e passe a trazer 200 resultados, cada área deve ter uma cor relativamente diferente) ✅
4. Colocar algum identificador visual do bairro, para que usuário não precise abrir modal por modal para ver qual é o bairro que deseja (tooltip ou nome fixo em cima da demarcação?) ✅
5. Otimizar performance (uso de hooks) ✅
6. Criar testes ✅
7. Colocar uma barra de busca de bairro ✅
8. Criar um pequeno design system ✅
9. Responsividade ✅

Explicação da lógica:

Primeiro quis organizar o projeto que foi feito durante live coding. Bruno me perguntou quais seriam as mudanças que eu faria no projeto se eu tivesse tempo, então usei isso como base para me orientar por onde começar.
Minha resposta foi dividida em duas partes na entrevista:

1. Melhorias de UI/UX

   - Colorir as áreas para facilitar diferenciação
   - Criar um gráfico para mostrar a evolução da população
   - Algo visual para exibir o nome do bairro e facilitar sua busca

2. Melhorias de código

   - Organizar estrutura de arquivos
   - Otimizar funções do código

Algumas decisões foram feitas baseadas pensando em um possível crescimento do projeto, então, começando pelo ponto de entrada do projeto, o `App.jsx`, pretendo explicar a lógica usada.

- App.jsx
  O endpoint de `populacao` é a restrição atual, pois não é possível usar o id do bairro como parâmetro para buscar somente a progressão específica, o endpoint sempre traz todas informações, então deve ser chamado no carregamento do projeto, juntamente com o `geojson`. Para agilizar, coloquei a chamada dos dois em paralelo, desta forma não fica esperando uma requisição terminar para que a outra comece.

- CustomMap.jsx

  - `Cores do mapa`
    As cores ajudam a diferenciar as áreas que estão próximas entre si, mas caso o endpoint passe a retornar 200 bairros, foi usada uma lógica para reaproveitar as 10 cores escolhidas, mas de forma que áreas próximas vão ficar com cores distintas, evitando confusão.
  - `Nomes dos bairros`
    Caso o usuário esteja vendo uma cidade que não tenha conhecimento da geografia, um auxílio visual sobre qual o nome de cada bairro pode ajudar a localizá-lo. Na eventualidade da api crescer e retornar diversos bairros, confesso que pode ficar poluído, então foi meu plano "A".
    O plano "B" foi colocar Overlay, um filtro das camadas do mapa, no canto superior da direita, para que possa ajudar a visualizar somente os bairros desejados.
    A ideia final só surgiu mais para o fim do projeto, que foi a barra de busca. Essa feature atende o nicho de usuários que têm o nome do bairro, mas não sabem onde fica.

- PopulationModal.jsx
  Novamente, com a possibilidade de crescimento do endpoint `populacao`, se pensou em deixar o modal lazy, somente ser carregado suas diversas informações quando o usuário clicar a primeira vez, evitando uma possível demora no carregamento inicial do projeto, visto a grande demanda que o navegador tem para conseguir renderizar mapas e gráficos.

- ErrorToast.jsx
  São feitas somente duas chamadas de endpoint no projeto, mas achei por bem criar um toast para capturar os erros e exibir para o usuário, pedindo que tente acessar novamente.

- Testes
  Os testes feitos são simples, de renderização e alguns de funcionamento de fluxo, mas que ajudaram a pegar alguns bugs de componentes. A maioria deles foi feito com auxílio de IA (copilot), pois é um trabalho manual e a IA diminuiu o tempo deste processo.

- Design System
  Acredito que alguns padrões estabelecidos no início do projeto ajudam ele a evoluir de forma mais consistente, e entre esses padrões, os estilos para CSS facilitam muito a vida no futuro, no caso de alterações de cores ou fontes. Também se cria uma identidade visual muito mais fácil do produto.
  Para isso, se criou uma pasta `src/assets/styles` que concentra todos os estilos usados no projeto. É um padrão que já usei em alguns outros projetos meus, e alterei as cores principais e fontes para bater com as da Moray.
