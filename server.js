var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var routes = require("./routes.js");
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'))

//
app.use(function(req,res,next){
  var requestInfo ={
    method: req.method, //http request method, ie get put post delete
    path: req.path, //url route
    query: req.quuery, //query params
    body: req.body, //info in body for post requests
    params: req.params, //info from dynamic parameters (ie /api/users/:userType)
  }
  console.log(requestInfo);
  next();
})

routes(app);

// app.post('*', bodyParser)
//

var port = process.env.PORT || 8785;

app.listen(port, function(err){
  if(err){
    console.log("Server error: ", err)
    process.exit(1);
  }
  console.log('Server running on port ' + port);
});
