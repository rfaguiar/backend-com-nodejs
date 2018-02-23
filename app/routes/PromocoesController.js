
module.exports = function(app) {
    app.get('/promocoes/form', function(req, res, next) {
        
        var connection = app.infra.ConnectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function (erros, resultados) {

            if (erros) {
                return next(erros);
            }

            res.format({
                html: function () {
                    res.render('promocoes/form', {lista: resultados});
                },
                json: function () {
                    res.json(resultados);
                }
            });
        });

        connection.end();

    });

    app.post("/promocoes",function(req,res, next) {            

        var produto = req.body;

        app.get('io').emit('novaPromocao', produto);
        res.redirect('promocoes/form');
    });
}