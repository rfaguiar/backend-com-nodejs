
var mysql = require('mysql');

function createDBConnection() {

    if (!process.env.NODE_ENV) {
        return mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'root',
            database: 'casadocodigo_nodejs'
        });
    } else if (process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'root',
            database: 'casadocodigo_nodejs_test'
        });
    } else if (process.env.NODE_ENV == 'production') {
        var urlDb = process.env.CLEARDB_DATABASE_URL;
        var grupos = urlDb.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)?reconnect=true/);
        return mysql.createConnection({
            host:grupos[2],
            user:grupos[0],
            password:grupos[1],
            database: grupos[3]
        });
    }
}

module.exports = function () {

    return createDBConnection;
}