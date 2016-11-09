var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var routes = require("./routes.js");
var mongoose = require("mongoose")
var sessions = require('client-sessions')({
  cookieName: "Hero Sesh",
  secret: "superStrongSecret",
  requestKey: 'session', //req.session
  duration: 80000000, //how long can someone stay logged in, in milliseconds
  cookie:{
    ephemeral: false, // when true expires when browser closed
    httpOnly: true, //when true cookie not accessible via front end JS
    secure: false // when true the cookie will only be read when sent over https
  }
});

app.use(sessions)
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/theArcade', function(err){
  if (err) {
      console.log("Error: " + err);
  } else {
      console.log("Connection succesful!")
  }
})

routes(app);
app.use(express.static('public'))


var port = process.env.PORT || 8785;

app.listen(port, function(err){
  if(err){
    console.log("Server error: ", err)
    process.exit(1);
  }
  console.log('Server running on port ' + port);
});
