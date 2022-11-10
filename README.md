# MSC DO ZERO: 

- <strong>Model:</strong> Essa camada tem como responsabilidade acomodar todo código capaz de acessar dados sejam eles em um banco de dados ou no sistema de arquivos.
- <strong>Service:</strong>: Essa camada tem como responsabilidade validar as regras de negócio de uma aplicação.
- <strong>Controller:</strong> Essa camada tem como responsabilidade validar os valores recebidos de uma aplicação cliente.

## Proposta do projeto ⛏️:

###   👉  Você foi contratado para construir uma API que consuma uma banco de dados de cadastro de pessoas de uma loja e para satifazer o cliente é necessário que essa API nos permita: 
    - Ler todas as pessoas cadastradas,
    - Cadastra um nova pessoa, sendo possível cadastrar mais de uma pessoa por vez,
    - Atualizar as informações de uma pessoa caso seja necessário,
    - Deletar uma pessoa. 


- Para isso será necessário seguir alguns pontos importantes: 

1. Crie um endpoint do tipo get '/person' que permita vizualizar todas as pessoas cadastradas.

 </br>
<details>
<summary> 💡 <strong>Configurando uma aplicação backend com nodejs + express + MySQL + testes:</strong></summary>

### Configurando o node

1. Inicia o node: 
    ```sh
    npm init -y
    ```
2. Instala o nodemon: 
    ```sh
    npm install -D nodemon
    ```
    - 📌 a flag "-D" significa que será instalado como dependência de desenvolvimento
</br>

### Configurando o express

1. Instala o express:
    ```sh
    npm install express
    ```
    - 📌 o Router é nativo do express

</br>

### Instalando o banco de dados - MySQL

1. Instala o MySQL:
    ```sh
    npm i mysql2
    ```

2. Instala o dotenv:
    ```sh
    npm i dotenv
    ```
</br>

### Instalando os frameworks de teste

1. Instala o mocha e chai:
    ```sh
    npm i -D mocha chai
    ```

2. Instala o sinon:
    ```sh
    npm i -D sinon
    ```

<details><summary> 💻  Configurando o package.json </summary>

```
    ...
    "scripts": {
        "test": "jest --config ./jest.config.js --runInBand --detectOpenHandles",
        "test:mocha": "nyc --all --include src/models --include src/services --include src/controllers mocha tests/unit/**/*.js --exit",
        "start": "node src/server.js",
        "debug": "nodemon --ignore coverage --inspect=0.0.0.0:9229 src/server.js",
        "migration": "node -e \"require('./__tests__/_utils').runMigration()\"",
        "seed": "node -e \"require('./__tests__/_utils').runSeed()\""
    },
    ...
```
</details>
</br>

<details><summary> ⚙️ Configurando a conexão do banco com o express </summary>

```
    const mysql = require('mysql2/promise');

    require('dotenv').config(); // não se esqueça de configurar suas variáveis de ambiente aqui na configuração

    const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    });

    module.exports = connection;
```

 - ⚠️ As variáveis de ambiente são declaradas no arquivo .env ou no docker caso esteja utilizando um container! ⚠️ 

</details>

</br>

### Bibliotecas que auxiliam:

- Biblioteca de status HTTP:
    ```sh
    npm i http-status-codes
    ``` 
    - 📌 Possui uma biblioteca de status HTTP

- Biblioteca de tratamento de erros:
    ```sh
    npm install express-async-errors
    ```
    - 📌 Ajuda no tratamento de erros sem precisar usar o try/catch
</details>


