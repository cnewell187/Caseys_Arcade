//MASTER ROUTING FILE!
var userController = require('./controllers/userController.js')
var scoreController = require('./controllers/scoreController.js')
var emailController = require('./controllers/emailController.js')
var User = require("./models/usersModel.js");

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile('index.html', {
            root: './public'
        })
    });

    app.get('/logout', function(req, res) {
        console.log("destroying req.session")
        console.log(req.session)
        req.session.destroy();
        res.redirect('/')
    });

    app.get('/guacAMole', function(req, res) {
        console.log(req.session)
        res.sendFile('guacAMole.html', {
            root: './public/html'
        })
    });

    app.get('/snake', function(req, res) {
        res.sendFile('snake.html', {
            root: './public/html'
        })
    });
    app.get('/laserEagle', function(req, res) {
        res.sendFile('laserEagle.html', {
            root: './public/html'
        })
    });

    app.get('/tetris', function(req, res) {
        console.log("navigating to tetrs:", req.session.userId)
        User.find({
            _id: req.session.userId
        }, function(err, doc) {
            console.log("the Doc: ", doc)
        })
        res.sendFile('tetris.html', {
            root: './public/html'
        })
    });

    app.get('/towerDefense', function(req, res) {
        res.sendFile('towerDefense.html', {
            root: './public/html'
        })
    });

    app.post('/suggestion', emailController.submitSuggestion)
    app.get('/userData', userController.getUser)
    app.get('/otherUserData/:userName', userController.getOtherUser)
    app.post('/login', userController.login)
    app.post('/register', userController.register)
    app.post('/newScore', userController.newScore)
    app.get('/getMyGameStats', scoreController.getMyGameStats)
    app.get('/getOtherGameStats/:userName', scoreController.getOtherGameStats)
    app.post('/updateLastPlayed', scoreController.updateLastPlayed)
    app.get('/snakeLeaderboard', scoreController.snakeLeaderboard)
    app.get('/guacAMoleLeaderboard', scoreController.guacAMoleLeaderboard)
    app.get('/tetrisLeaderboard', scoreController.tetrisLeaderboard)
    app.get('/laserEagleLeaderboard', scoreController.laserEagleLeaderboard)


}
