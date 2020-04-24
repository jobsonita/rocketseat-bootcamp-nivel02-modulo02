# Instalação

Na raiz do projeto, execute:

```
yarn
```

# Uso

Na raiz do projeto, execute:

```
yarn dev:server
```

# Comandos utilizados na construção do projeto

## Sessão 01

### Aula 04

```
yarn add typeorm pg
```

### Aula 05

```
yarn typeorm migration:create -n CreateAppointments
yarn typeorm migration:run
yarn typeorm migration:show
yarn typeorm migration:revert
yarn typeorm migration:run
```

### Aula 06

[definite assignment assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#definite-assignment-assertions)

### Aula 07

```
yarn add reflect-metadata
```

Devido a alterações na migration, é necessário recriar as tabelas:

```
yarn typeorm migration:revert
yarn typeorm migration:run
```

## Sessão 02

### Aula 01

```
yarn typeorm migration:create -n CreateUsers
yarn typeorm entity:create -n User
```

Devido a alterações na migration de Appointments, é necessário recriar as tabelas:

```
yarn typeorm migration:revert
yarn typeorm migration:run
```

### Aula 02

```
yarn typeorm migration:create -n AlterProviderFieldToProviderId
```

Devido a alterações nas migrations de Appointments e de Users, é necessário recriar as tabelas:

```
yarn typeorm migration:revert
yarn typeorm migration:revert
yarn typeorm migration:run
```

### Aula 04

```
yarn add bcryptjs
yarn add @types/bcryptjs -D
```

## Sessão 03

### Aula 03

```
yarn add jsonwebtoken
yarn add @types/jsonwebtoken -D
```
