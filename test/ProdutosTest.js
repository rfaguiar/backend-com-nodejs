
var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function () {

    afterEach(function(done) {
        
        var connection = express.infra.ConnectionFactory();
        connection.query("delete from livros", function(error, result) {
            if(!error) {
                done();
            }
        });
        connection.end();
    });

    it('#listagem de produtos em json', function (done) {

        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/, done);
    });

    it('#listagem de produtos em html', function (done) {

        request.get('/produtos')
            .set('Accept', 'text/html')
            .expect(200)
            .expect('Content-Type', /html/, done);
    });

    it('#cadastro de novo produtos com dados invalidos', function (done) {

        request.post('/produtos')
            .send({titulo: '', descricao: 'novo livro'})
            .expect(400, done);
    });

    it('#cadastro de novo produtos com dados validos', function (done) {

        request.post('/produtos')
            .send({titulo: 'titulo', descricao: 'novo livro', preco: 20.50})
            .expect(302, done);
    });
});