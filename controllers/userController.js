var User = require("../models/usersModel.js");
var bcrypt = require('bcryptjs');
var Game = require("../models/gameModel.js");

function login(req, res) {
    console.log("Login POST PAYLOAD YO: ", req.body)
    User.findOne({
        email: req.body.email
    }, function(err, userDoc) {
        if (err) {
            console.error("The Error: ", err)
            res.status(500).json(err)
        }
        if (!userDoc) {
            console.warn('No user found!');
            res.status(403).json({
                message: "Nope"
            })
        } else {
            console.info("auth.login:", userDoc)
            bcrypt.compare(req.body.password, userDoc.password, function(compareErr, matched) {
                if (compareErr) {
                    console.error("The Error: ", err)
                    res.status(500).json(err)
                } else if (!matched) {
                    console.warn("Password mismatch");
                    res.status(403).json({
                        message: "Nope"
                    });
                } else {
                    console.log("Password is correct")
                    req.session.userId = userDoc._id;
                    console.log(req.session.userId)
                    res.send({
                        message: "Pass",
                        userName: userDoc.userName
                    });
                }
            })
        }
    })
}

function register(req, res) {
    console.log(req.body)
    var newUserDocument = new User(req.body);
    newUserDocument.save(function(err, doc) {
        if (err) {
            console.log("The Error: " + err)
            return res.send(err)
        } else {
            console.log("A new user has been created!")
            return res.send(doc)
        }
    })
}

function logout(req, res) {
    console.log(req.session)
    req.session.reset();
    res.redirect('/login.html');
}

//session will be the middleware that checks for a logged in user, it is middleware
function session(req, res, next) {
    if (req.session.userId) {
        console.log("the session function running")
        next();
    } else {
        res.redirect('/login.html');
    }

}

function newScore(req, res) {
    console.log("The req.session", req.body)
    var info = req.body
    if (req.session.userId) {
        User.findOne({
                _id: req.session.userId
            }, function(err, doc) {
                var conditions = {
                    gameUser: doc.userName, //req.session.userId
                    game: req.body.game,
                }
                var now = Date.now()
                var update = {
                    $push: {
                        scores: req.body.score
                    },
                    $max: {
                        highscore: req.body.score
                    },
                    $set :{
                      lastPlayed: now
                    },
                    $set :{
                      gameIcon: req.body.gameIcon
                    }
                }
                Game.findOneAndUpdate(conditions, update, {
                    upsert: true,
                    new: true
                }, function(err, doc) {
                    console.log("The error: ", err)
                    console.log("Score updated Doc ", doc)
                        //info.message = "Score Submitted Yo"
                    res.send(doc)
                });
            }

        )
        User.findOneAndUpdate({
                _id: req.session.userId
            }, { $inc :{totalPoints: 1}}, {new:true}, function(err ,doc){
                console.log("Update total points: ", doc)
            });

    } else {
        res.send("You must be logged in to save your score!")
    }
}

function getUser(req, res) {
    if (req.session.userId) {
        console.log("the session function running")
        User.findOne({
            _id: req.session.userId
        }, function(err, userDoc) {
            if (err) {
                return res.send(err);
            }
            res.send(userDoc);
        })
    } else {
        res.send({
            userName: "register",
            logoutStatus: "/#/login",
            logoutStatus2: 'login',
            registerStatus: "register"
        });
    }
}

function getOtherUser(req, res) {

    User.findOne({
        userName: req.params.userName
    }, function(err, userDoc) {
        if (err) {
            return res.send(err);
        }
        res.send(userDoc);
    })

}

module.exports = {
    login: login,
    register: register,
    logout: logout,
    session: session,
    newScore: newScore,
    getUser: getUser,
    getOtherUser: getOtherUser
}
