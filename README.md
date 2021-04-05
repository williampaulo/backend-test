# O Boticário: Cashback

## Quais requisitos técnicos foram utilizado?

- Nodejs
- PostgreSQL

## Quais diferenciais foram explorados?

- Testes unitários
- Testes de integração
- Autenticação JWT

## Requisitos para testa o código

- Docker
- Docker Compose

### Subindo os containers

```bash
docker-compose up -d
```

### Entrando no container backend

```bash
docker exec -it backend bash
```

## Instalando dependências

### Usando yarn

```bash
yarn install
```

### Usando npm

```bash
npm install
```

### Suba as migrations

```bash
yarn typeorm migration:run
```

### Inicie a aplicação

```bash
yarn dev:serve
```

### Endpoints

| Requisição | Paths      | Objetivos           |
| ---------- | ---------- | ------------------- |
| POST       | /retailers | Cadastra revendedor |
| POST       | /sessions  | Criar um token JWT  |
| GET        | /purchases | Lista compras       |
| POST       | /purchases | Cadastra compra     |
| PUT        | /purchases | Edita compra        |
| DELETE     | /purchases | Deleta compra       |
| GET        | /cashback  | Cashback acumulado  |

### Testes

```bash
yarn test
```

###### Os teste estão juntamente com os services

```bash
./usr/modules/**/services
```
