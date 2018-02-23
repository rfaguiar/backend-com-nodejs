/** Simulação de um cliente android */

var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    headers: {
        'Accept': 'application/json'
        // 'Accept': 'text/html'
    }
};


http.get(configuracoes, function (res) {

    console.log('status code: ' + res.statusCode);

    res.on('data', function (body) {
        console.log('Corpo: ' + body);
    });
});