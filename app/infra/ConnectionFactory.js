
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
            host:grupos[3],
            user:grupos[1],
            password:grupos[2],
            database:grupos[4]
        });
    }
}

module.exports = function () {

    return createDBConnection;
}