# Minha intenção de como melhorar o projeto será através dos seguintes passos:

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
10. Para o caso das cores, utilizei a teoria dos grafos para que os bairros adjacentes nunca fiquem com cores iguais, evitando confusão ao usuário ✅

# Explicação da lógica:

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
    As cores ajudam a diferenciar as áreas que estão próximas entre si, mas caso o endpoint passe a retornar 200 bairros, foi usada um cálculo para reaproveitar as 4 cores escolhidas, mas de forma que áreas próximas vão sempre ficar com cores distintas, evitando confusão.
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

- Responsividade
  Com utilização do Design System, se definiu breakpoints para os tamanhos de tela, de forma que usuários com diferentes dispositivos possam utilizar o projeto com melhor UX.

# Melhorias futuras

## Performance / escalabilidade

1. Permitir que o endpoint de “/populacao” aceite id do bairro como parâmetro. Desta forma posso deixar de chamar na inicialização do projeto, e chamar somente quando clicar na área do bairro, ao abrir o modal.
   a. Para otimizar ainda mais, podemos usar cache do backend no endpoint de cada bairro, visto que são dados que não alteram tão frequentemente. Caso sejam poucos dados do backend, podemos fazer o uso de local storage com store para evitar chamar o backend, ao invés do cache.
2. Carregamento lazy do mapa. Na inicialização do projeto, definir uma área inicial e carregar somente alguns poucos bairros, e ir chamando o backend para atualizar os dados conforme usuário navegar pelo mapa através de zoom out ou drag. Vamos salvando as informações que forem sendo carregadas do backend no front, em uma store.
3. Pesquisa de bairro indexada no banco. Desta forma, sempre que uma busca for feita, não haverá necessidade de percorrer toda a tabela de bairros para se achar as informações necessárias.

## De acordo com minha percepção através das perguntas e feedback da empresa, esses são os possíveis pontos de melhoria, que trariam um maior valor para o usuário:

1. Comparação da evolução populacional entre bairros
   a. Pela investigação feita, a melhor maneira de se fazer esta comparação seria colocar os gráficos em sobreposição, com o eixo X igual, e eixo Y iniciando com valor 10% abaixo do valor mínimo entre os gráficos e terminando com valor 10% acima do valor máximo entre os gráficos. - O objetivo desta visualização é poder comparar a quantidade populacional entre os bairros, caso os valores de população sejam semelhantes.
   b. No caso de valores populacionais distantes, como por exemplo, um bairro da cidade de São Paulo (Grajaú - 350 mil habitantes), sendo comparada com um bairro de Santa Bárbara d'Oeste, Águas de Santa Bárbara (1 mil habitantes), seria interessante ter uma visualização que exiba a diferença, em porcentagem, entre os pontos do gráfico. Exemplo: Grajaú (2002 - 300 mil hab; 2004 - 330 mil hab; crescimento no período de 10%); Águas de Santa Bárbara (2002 - 500 hab; 2004 - 750 hab; crescimento de 50%).
2. Comparação de outras estatísticas que podem ser relacionadas com a evolução populacional do bairro
   a. Por exemplo, se quisermos saber a taxa de criminalidade conforme os anos passam e a população aumenta ou diminui. Para este caso, acredito que podemos seguir por um dos dois caminhos, sendo o caminho 1 o de melhor visualização:
   1. Criar uma aba que exiba o crescimento em termos de porcentagem, igual descrito no item `1b`, e também os dados de criminalidade em porcentagem. Desta forma, o eixo X e Y dos dois dados são iguais, e é possível ter uma noção melhor dessa evolução.
   2. Colocar a informação junto com o tooltip que há conforme se coloca o mouse em cima do ponto, trazendo as informações de "ano", "população" e "criminalidade". Podemos até implementar um ícone de seta para cima ou para baixo, comparando com o valor do registro anterior.
3. Ao buscar o bairro pela barra de pesquisa, caso o popup de evolução populacional esteja aberto, atualizar com as informações do bairro selecionado.
4. Podemos tirar a coloração do mapa, que está usando uma lógica complexa e, talvez, prejudicando performance, e deixar somente o contorno dos bairros. Essa feature de coloração parece ter pouco valor para o cliente.
5. Temos bairros de mesmo nome em cidades diferentes, temos que exibir essa diferença visualmente para o usuário.
