var Game = require("../models/gameModel.js");
var User = require("../models/usersModel.js");

module.exports = {
    snakeLeaderboard: snakeLeaderboard,
    guacAMoleLeaderboard: guacAMoleLeaderboard,
    updateLastPlayed: updateLastPlayed,
    getMyGameStats: getMyGameStats
}

function snakeLeaderboard(req, res) {
    Game.find({
        game: 'snake'
    }).sort({
        'highscore': -1
    }).limit(5).exec(
        function(err, data) {
            console.log(data)
            res.send(data)
        }
    )
}

function guacAMoleLeaderboard(req, res) {
    Game.find({
        game: 'guacAMole'
    }).sort({
        'highscore': -1
    }).limit(5).exec(
        function(err, data) {
            console.log(data)
            res.send(data)
        }
    )
}

function tetrisLeaderboard(req, res) {
    Game.find({
        game: 'tetris'
    }).sort({
        'highscore': -1
    }).limit(5).exec(
        function(err, data) {
            console.log(data)
            res.send(data)
        }
    )
}

function updateLastPlayed(req, res) {
    console.log("The req.body", req.body)
    var info = req.body
    if (req.session.userId) {
        User.findOne({
                _id: req.session.userId
            }, function(err, doc) {
                var conditions = {
                    gameUser: doc.userName,
                    game: req.body.game,
                }

                var now = Date.now()
                var update = {
                    $set: {
                        lastPlayed: now
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
    } else {
        res.send("You must be logged in to save your score!")
    }
}
function getMyGameStats(req, res){

  if (req.session.userId) {
      User.findOne({
              _id: req.session.userId
          }, function(err, doc) {
              var conditions = {
                  gameUser: doc.userName,
                }




              Game.find(conditions, function(err, docs) {
                  console.log("The error: ", err)
                  console.log("Score updated Docs ", docs)
                      //info.message = "Score Submitted Yo"
                  res.send(docs)
              });
          }

      )
  } else {
      res.send("You must be logged in to save your score!")
  }

}
