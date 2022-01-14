# Cadastro de Carro
## RF
- [ ] Deve ser possível cadastrar um novo carro
- [ ] Deve ser possível listar todas as categorias
## RN
- [ ] Não deve ser possível cadastrar um carro com uma placa já existente
- [ ] Não deve ser possível alterar a placa de um carro já cadastrado
- [ ] O carro deve ser cadastrado, por padrão, com disponibilidade
- [ ] O usuário responsável pelo cadastro deve ser um administrador

# Listagem de carros
## RF
- [ ] Deve ser possível listar todos os carros disponíveis
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome da marca
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome do carro
## RN
- [ ] O usuário não precisa estar autenticado para fazer a listagem

# Cadastro de Especificação no carro
## RF
- [ ] Deve ser possível cadastra uma especificação para o carro
- [ ] Deve ser possível listar todas as especificações
## RN
- [ ] Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- [ ] Não deve ser possível cadastrar uma especificação já existente para um mesmo carro
- [ ] O usuário responsável pelo cadastro deve ser um administrador

# Cadastro de imagens do Carro
## RF
- [ ] Deve ser possível cadastrar a imagem do carro
- [ ] Deve ser possível listar todos os carros
## RNF
- [ ] Utilizar o multer para upload de arquivos
## RN
- [ ] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- [ ] O usuário responsável pelo cadastro deve ser um administrador

# Aluguel de Carro
## RF
- [ ] Deve ser possível cadastrar um aluguel
## RN
- [ ] O aluguel deve ter pelo menos 24hrs de duração
- [ ] Não deve ser possível cadastrar um novo aluguel aberto para o mesmo usuário
- [ ] Não deve ser possível cadastrar um novo aluguel aberto para o mesmo carro
