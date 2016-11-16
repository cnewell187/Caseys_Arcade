var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
  gameUser:{
      type: String,
  },
  game:{
      type: String,

  },
  scores:{type: Array, default:[]},
  highscore:{type: Number, default:0},
  timesPlayed:{type: Number, default:0},
  lastPlayed: {
      type: Number,
      default: () => Date.now()
  },
  gameIcon:{
      type: String,
  }
})

module.exports = mongoose.model('Game', gameSchema, 'games')
