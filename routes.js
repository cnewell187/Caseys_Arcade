//MASTER ROUTING FILE!
var userController = require('./controllers/userController.js')

module.exports = function(app) {
    app.get('/' ,function(req, res) {
        res.sendFile('index.html', {root: './public'})
    });

    app.get('/logout' ,function(req, res) {
       req.session.destroy();
        res.redirect('/')
    });

    app.get('/guacAMole', function(req, res) {
        res.sendFile('guacAMole.html', {root: './public/html'})
    });

    app.get('/snake', function(req, res) {
        res.sendFile('snake.html', {root: './public/html'})
    });

    app.get('/tetris', function(req, res) {
        res.sendFile('tetris.html', {root: './public/html'})
    });

    app.get('/towerDefense', function(req, res) {
        res.sendFile('towerDefense.html', {root: './public/html'})
    })
      app.get('/userData', userController.getUser)
      app.post('/login', userController.login)
      app.post('/register', userController.register)
      app.post('/newScore', userController.newScore)
}
