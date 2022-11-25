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
