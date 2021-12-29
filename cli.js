const database = require('./index.js')();
const argParse = require('subheaven-arg');

argParse.init("subheaven-local-db", "cria e gerencia bancos de dados embarcados");
argParse.positional("name", "Nome a ser cumprimentado", { required: false, default: "", sample: "SubHeaven" });
(async() => {
    if (argParse.validate()) {
        await database.set_limit('tabela_teste', 10);

        let dataset = await database.find('tabela_teste');
        console.log("============================================");
        console.log(dataset);

        if (dataset.length > 0) {
            // await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 200 });
        } else {
            await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 100 });
            await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 101 });
            await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 102 });
            await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 103 });
            await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 104 });
            await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 105 });
            await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 106 });
            await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 107 });
            await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 108 });
            await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 109 });
            await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 110 });
            await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 111 });
            await database.insert('tabela_teste', { message: 'Olá mundo', codigo: 112 });
        }

        let dataset2 = await database.find_one('tabela_teste', { codigo: 105 });
        console.log("============================================");
        console.log(dataset2);

        console.log("");

        // await database.update('tabela_teste', { _id: 11 }, { codigo: 333 });
        // await database.delete('tabela_teste', { _id: 9 });

        console.log("");

        let dataset3 = await database.find('tabela_teste');
        console.log("============================================");
        console.log(dataset3);
    }
})();