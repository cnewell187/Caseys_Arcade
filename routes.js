//MASTER ROUTING FILE!
var userController = require('./controllers/userController.js')

module.exports = function(app) {
    app.get('/' ,function(req, res) {
        res.sendFile('index.html', {root: './public'})
    })

      app.post('/login', userController.login)
      app.post('/register', userController.register)
}
