# Function Requirements

1. Deve ser possível cadastrar uma nova empresa
  - Validar se a empresa já existe pelo nome
  - Validar se o usuário já existe pelo e-mail
  - Realizar a criptografia da senha


2. A empresa deve conseguir adicionar novos usuários
  - Validar se o e-mail já existe
  - Criptografar a senha
  

3. A empresa deve conseguir excluir usuários
  - Verificar se o usuário existe
  - Emitir um evento para deslogar o usuário


4. A empresa deve conseguir criar um novo projeto
  - Validar se o projeto já existe pelo nome apenas no contexto já empresa


5. A empresa deve conseguir importar um novo projeto a partir de um diretório com vários arquivos JSON
  - Validar o diretório com os arquivos
  - Para cada arquivo JSON, criar um namespace (usar transactions)
  - Para cada namespace, criar as words


6. A empresa deve conseguir criar namespace dentro do projeto
  - Validar se o namespace já existe pelo nome apenas no contexto do projeto e da empresa


7. A empresa deve conseguir importar um namespace a partir de um arquivo JSON
  - Validar o arquivo JSON
  - Validar se o nome do namespace já existe
  - Criar as words

