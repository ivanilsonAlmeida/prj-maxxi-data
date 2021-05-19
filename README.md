## Projeto Técnico

## Description

Projeto Técnico utilizando o stack NodeJs com framework NestJs.
Para começar a rodar o projeto é necessário rodar os scripts em um banco Postgres, que se encontra dentro do projeto no arquivo scripts_postgres.db
O projeto usa como porta padrão 3090 e assim que instalado somente realizar buscas na mesma porta.
As chamadas das API's do projeto se encontram em um arquivo exportado da aplicação Insomnia, na pasta chamada API que se encontra na base do projeto.

## Installation

```bash
$ npm install
$ Em caso de usar o PostgresSQL com Docker, rodar o comando abaixo
$ npm run postgres:install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
