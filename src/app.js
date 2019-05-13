// Detalhes bobos, porém úteis, a aplicação pode ser executada com "node ."
// Para definir uma versão de um modulo a ser baixado coloque @ e a versão ex: "express@x.x.x"

const http = require("http");
const express = require("express");
const spoilersRoute = require("../src/routes/spoilers")
const sequelize = require("./database/database")
const status = require("http-status")
const app = express();

app.use(express.json())

app.use('/api', spoilersRoute)

app.use((request, response, next) => {
    response.status(status.NOT_FOUND).send();
});

app.use((error, request, response, next) => {
    response.status(status.INTERNAL_SERVER_ERROR).json({ error });
});


// server.listen(port, hostname, () => {
//     console.log(`Servidor em execução em http://${hostname}:${port}/`);

// });

//FORCE TRUE FAZ COM QUE O SEQUELIZE CRIE UMA TABELA COM OS DADOS RESPECTIVOS, PORÉM NÃO CRIA O BANCO
//USE NA PRIMEIRA VEZ QUE CRIAR A TABELA, DEPOIS QUE ESTIVER TUDO
//RODANDO DIREITINHO REMOVA, POIS ELE APAGA E CRIA NOVAMENTE AS TABELAS 
sequelize.sync({ force: true }).then(() => {
    const port = process.env.PORT||3000;
    
    app.set("port", port);

    const server = http.createServer(app);

    server.listen(port);

});