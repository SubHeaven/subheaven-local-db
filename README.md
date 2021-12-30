# subheaven-local-db
Modulo para gerenciamento de bancos de dados embarcados

Como instalar:
```
npm i https://github.com/SubHeaven/subheaven-local-db
```

## Como importar
```
const database = require('subheaven-local-db')();
```

Com isso ele irá gerar uma pasta chamada ***local-db\database*** onde será gravado o banco de dados.
É possível também informar um nome diferente para a pasta logo depois de ***local-db***:

```
const database = require('subheaven-local-db')('compras');
```

Com isso ele irá gerar uma pasta chamada ***local-db\compras***. Isso é particularmente útil quando queremos gerenciar várias pastas em uma mesma raiz. O equivalente a um database.

## Como inserir dados
```
await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 100 });
```

## Como limitar tamanho da tabela

É possível definir um limite de registro para cada tabela. Isso é particularmente quando o banco de dados é usado apenas para gravar logs.

Com isso, toda a vez que um novo registro é inserido, o registro mais antigo é deletado de forma que a quantidade máxima de registro será a quantidade informada.

```
await database.set_limit('tabela_teste', 10);
```

No exemplo acima, a tabela ***tabela_teste*** terá sempre, no máximo, os 10 registros mais novos.

## Como alterar dados
```
await database.update('tabela_teste', { _id: 11 }, { codigo: 333 });
```

## Como excluir dados
```
await database.delete('tabela_teste', { _id: 9 });
```

## Como consultar todos os registros
```
let dataset = await database.find('tabela_teste');
```

## Como consultar alguns registros
```
let dataset = await database.find('tabela_teste', { codigo: 105 });
```
## Como consultar apenas um registro
```
let dataset = await database.find_one('tabela_teste', { codigo: 105 });
```
