# Configurando uma aplicação backend com nodejs + express + MySQL + testes:

## Configurando o node

1. Inicia o node: 
    ```sh
    npm init -y
    ```
2. Instala o nodemon: 
    ```sh
    npm install -D nodemon
    ```
    - -D dependência de desenvolvimento
</br>

## Configurando o express

1. Instala o express:
    ```sh
    npm install express
    ```
    - o Router é importado do express

</br>

## Instalando o banco de dados - MySQL

1. Instala o MySQL e o dotenv:
    ```sh
    npm i mysql2 dotenv
    ```
</br>

## Instalando a ORM Sequelize e configurando junto ao Typescript 

1. Instala o Sequelize e a declaração de tipos p/ sequelize:
    ```sh
    npm i sequelize @types/sequelize
    ```

    - É importante lembrar que o sequelize-cli não dá suporte nativo na interpretação/criação de migrations, seeders e models em TS.
    - Sequelize possui suas próprias definições de tipos, mas isso significa que para utilizarmos ele na nossa API teremos que fazer algumas coisas “na mão”.

</br>

2. Instala o CLI do Sequelize:
    ```sh
    npm i -D sequelize-cli
    ```
</br>

3. Para configurar o sequelize-cli, é necessário criar o arquivo <strong>.sequelizerc</strong>, ele será responsável por guardar as informações dos caminhos onde devem se encontrar seus recursos do DB:

    ```sh
    const path = require('path');

    module.exports = {
    'config': path.resolve(__dirname,'build','database','config', 'database.js'),
    'models-path': path.resolve(__dirname,'build','database','models'),
    'seeders-path': path.resolve(__dirname,'src','database', 'seeders'),
    'migrations-path': path.resolve(__dirname,'src','database', 'migrations'),
    };
    ```
    - OBS: A pasta "build" é referente a pasta configurada em seu tsconfig.json, na propriedade compilerOptions.outDir, essa pasta é gerada pelo compilador, transformando os arquivos ts em JS Vanilla.

</br>

4. Roda o comando do cli:
     ```sh
    npx sequelize-cli init
    ```
    - Crie as pastas: ./src/database/config/ ./src/database/models/
    - Descarte a pasta ./build/database/

</br>

5. Crie o arquivo em ./src/database/config/database.ts:
    ```sh
    import 'dotenv/config';
    import { Options } from 'sequelize';

    const config: Options = {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'app_db_lend',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    }

    export = config;
    ```
    - Caso o objeto process acuse erro, inclua em sua aplicação o pacote @types/node como dependência de desenvolvimento.

</br>

### OBS: As migrations e seeders podem ser feitas com ajuda do sequelize-cli. Os models em TS.
</br>

<details>
<summary>Criando as migrations, seeders e models</summary>

### Migrations

    ```
    npx sequelize migration:generate --name nome-da-migration
    ```
### Seeders
    ```sh
    npx sequelize seed:generate --name nome-da-seed
    ```

### Models
 - Cria a model com nome desejado, a model é extendida da { Model } do sequelize:
 - Lembre-se de criar na pasta ./src/database/models/.ts
 - Exemplo: 
    ```sh
    import { Model } from 'sequelize';
    import db from '.';

    import OtherModel from './OtherModel'; // Nossa outra entidade

    class Example extends Model {
    // declare <campo>: <tipo>;
    }

    Example.init({
    // ... Campos
    }, {
    // ... Outras configs
    underscored: true,
    sequelize: db,
    // modelName: 'example',
    timestamps: false,
    });

    /**
    * `Workaround` para aplicar as associations em TS:
    * Associations 1:N devem ficar em uma das instâncias de modelo
    * */

    OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
    OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

    Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
    Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

    export default Example;
    ```
</details>

</br>

## Configurando o package.json

```
    ...
    "scripts": {
        "start": "npm run build && node ./build/index.js",
        "dev": "tsnd index.ts",
        "build": "tsc"
        "db:reset": "npx -y tsc && npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all"
    },
    ...
```
</br>

## Bibliotecas que auxiliam:

- Biblioteca de status HTTP:
    ```sh
    npm i http-status-codes
    ``` 

- Biblioteca de tratamento de erros - não tem a necessidade de colocar try/catch: 
    ```sh
    npm install express-async-errors
    ```


