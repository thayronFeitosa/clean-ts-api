## NodeJs, Typescript, TDD, DDD, Clean Architecture e SOLID

<p>Curso de  Architecture e SOLID, TDD, DD do professor Rodrigo manguinho</p>

![diagrama](./img/diagramaSignup.png)

## Configurando o husky
<p>Para configurar o husky será preciso rodar os seguintes comandos caso a pasta .husky não contenha os arquivos "commit-msg , pre-commit e pre-push" </p>

* husky install
* npx husky add .husky/commit-msg '.git/hooks/commit-msg $1'
* npx husky add .husky/pre-commit 'npx lint-staged'
* npx husky add .husky/pre-push 'npm run test:ci'

<p>Caso os arquivos já existam, será necessário somente rodar o comando a baixo</p>
* chmod ug+x .husky/*


[![Build Status](https://travis-ci.org/rmanguinho/clean-ts-api.svg?branch=master)](https://travis-ci.org/rmanguinho/clean-ts-api)
[![Coverage Status](https://coveralls.io/repos/github/rmanguinho/clean-ts-api/badge.svg)](https://coveralls.io/github/rmanguinho/clean-ts-api)
[![Known Vulnerabilities](https://snyk.io/test/github/rmanguinho/clean-ts-api/badge.svg)](https://snyk.io/test/github/rmanguinho/clean-ts-api)
![Dependabot](https://flat.badgen.net/dependabot/rmanguinho/clean-ts-api?icon=dependabot)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)
# **Clean Node API**
[![alt text](./public/logo.png "Link para o treinamento")](https://www.udemy.com/course/tdd-com-mango/?referralCode=B53CE5CA2B9AFA5A6FA1)
---
## [**Link para o curso completo**](https://www.udemy.com/course/tdd-com-mango/?referralCode=B53CE5CA2B9AFA5A6FA1)
Essa API faz parte do treinamento do professor Rodrigo Manguinho (Mango) na Udemy.
O objetivo do treinamento é mostrar como criar uma API com uma arquitetura bem definida e desacoplada, utilizando TDD (programação orientada a testes) como metodologia de trabalho, Clean Architecture para fazer a distribuição de responsabilidades em camadas, sempre seguindo os princípios do SOLID e, sempre que possível, aplicando Design Patterns para resolver alguns problemas comuns.
## [**Link para a documentação da API**](http://fordevs.herokuapp.com/api-docs)
> ## APIs previstas para esse treinamento
1. [Cadastro](./requirements/signup.md)
2. [Login](./requirements/login.md)
3. [Criar enquete](./requirements/add-survey.md)
4. [Listar enquetes](./requirements/load-surveys.md)
5. [Responder enquete](./requirements/save-survey-result.md)
6. [Resultado da enquete](./requirements/load-survey-result.md)
> ## Princípios
* Single Responsibility Principle (SRP)
* Open Closed Principle (OCP)
* Liskov Substitution Principle (LSP)
* Interface Segregation Principle (ISP)
* Dependency Inversion Principle (DIP)
* Don't Repeat Yourself (DRY)
* You Aren't Gonna Need It (YAGNI)
* Keep It Simple, Silly (KISS)
* Composition Over Inheritance
* Small Commits
> ## Design Patterns
* Factory
* Adapter
* Composite
* Decorator
* Proxy
* Dependency Injection
* Abstract Server
* Composition Root
> ## Metodologias e Designs
* TDD
* Clean Architecture
* DDD
* Conventional Commits
* GitFlow
* Modular Design
* Dependency Diagrams
* Use Cases
* Continuous Integration
* Continuous Delivery
* Continuous Deployment
> ## Bibliotecas e Ferramentas
* NPM
* Typescript
* Git
* Docker
* Jest
* MongoDb
* Travis CI
* Swagger
* Coveralls
* Bcrypt
* JsonWebToken
* Validator
* Express
* Supertest
* Husky
* Lint Staged
* Eslint
* Standard Javascript Style
* Sucrase
* Nodemon
* Rimraf
* In-Memory MongoDb Server
* MockDate
* Module-Alias
> ## Features do Node
* Documentação de API com Swagger
* Log de Erro
* Segurança (Hashing, Encryption e Encoding)
* CORS
* Middlewares
* Nível de Acesso nas Rotas (Admin, User e Anônimo)
* Deploy no Heroku
> ## Features do Git
* Alias
* Log Personalizado
* Branch
* Reset
* Amend
* Tag
* Stash
* Rebase
* Merge
> ## Features do Typescript
* POO Avançado
* Interface
* TypeAlias
* Utility Types
* Modularização de Paths
* Build
* Deploy
* Uso de Breakpoints
> ## Features de Testes
* Testes Unitários
* Testes de Integração
* Cobertura de Testes
* Mocks
* Stubs
* Spies

> ## Features do MongoDb

* Connect e Reconnect
* Collections
* InsertOne e InserMany
* Find, FindOne e FindOneAndUpdate
* DeleteMany
* UpdateOne
* Aggregation (Match, Group, Unwind, Lookup, AddFields, Project)
* ObjectId
* Upsert e ReturnOriginal
* Push, Divide, Multiply, ArrayElemAt, Filter, Cond, Sum