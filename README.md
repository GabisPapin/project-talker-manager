# Project Talker Manager

Este projeto foi desenvolvido com o objetivo de fixar o conteúdo sobre API Rest e CRUD (utilizando Node.js com express) do curso oferecido pela Trybe.

Neste projeto criei endpoints para requisitar informações sobre os palestrantes.

### Observações importantes:

Os arquivos citados abaixo foram criados/ configurados pela Trybe:

eslint, git ignore, docker-compose, package.json, package-lock.json, jest.config.js, talker.json.

## Descrição dos requisitos:

#### 1 - Foi criado um endpoint GET /talker
Retorna o status 200 e um array com todos os palestrantes cadastrados ou caso não exista nenhum cadastro, retorna status 200 e um array vazio.

#### 2 - Foi criado um endpoint GET /talker/:id
Retorna o status 200 e um palestrante de acordo com o id da rota ou caso não exista esse id, retorna o status 404 com uma mensagem.

#### 3 - Foi criado um endpoint POST /login
Ao receber no body da requisição os campos email e password no formato json, retorna um token aleatório com 16 caracteres.

#### 4 - Foi adicionado validações para o endpoint /login
Os campos recebidos da requisição devem ser validados (o campo email é obrigatório e válido e o campo password é obrigatório e deve ter pelo menos 6 caracteres). 
Caso os valores sejam inválidos o endpoint deve retornar o código status 400 e uma mensagem de acordo com cada validação.

#### 5 - Foi criado um endpoint POST /talker
O endpont adiciona um palestrante e o body da requisição deve conter name, age, talk, WatchedAt, rate no formato json.
Primeiro é validado se existe um token e se ele é valido, caso não retorna um status 401 com uma mensagem de acordo com o erro.
Segundo foram feitas validações para cada campo adicionado no cadastro e mensagens de erro com status 400.
Após passar por todas as validações, retorna status 201 e as informações cadastradas no formato json.

#### 6 - Foi criado um endpoint PUT /talker/:id
Este endpoint edita as informações do palestrante de acordo com o id da rota, sem alterar o id. O body da requisição deve ser no formato json e conter os campos citados no requisito 5, assim como as validações.

#### 7 - Foi criado um endpoint DELETE /talker/:id
Primeiro é validado o token, caso não exista ou seja inválido, retona o status 401 e uma mensagem de erro de acordo. 
Segundo, o endpoint deve receber o id do palestrante a ser deletado do arquivo e em caso de sucesso, retorna o status 204 sem conteúdo na resposta da requisição.

#### 8 - Foi criado um endpoint GET /talker/search?q=searchTerm
Primeiro é verificado se o token existe e é válido assim como os requisitos anteriores.
Este endpoint retorna um array de palestrantes que contenham em seu nome os caracteres pesquisados no queryParam da URL, por fim retorna o status 200 e o body com todas as informações dos palestrantes.
Caso não existe nenhum palestrante com os caracteres pesquisados é retornado o status 200 e um array vazio.
