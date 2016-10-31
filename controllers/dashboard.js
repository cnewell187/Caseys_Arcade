module.exports = {
  root: function(req, res){
    res.send("Dashboard");
  },
  settings: function(req, res){
    res.send("Dashboard Settings")
  }
}
