var users = require("../models/users.js");
module.exports = {
    //return a json array of all users
    getAll: function(req, res) {
        res.json(users.findAll());
    },

    getUser: function(req, res) {
        console.log(
                "Query: ", req.query,
                "\nPath: ", req.path,
                "\nBody: ", req.body
            )
            //?id=1
        var user = users.find(req.query.id)
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    },

    add: function(req, res) {
      console.log("Adding a user")
        users.add(req.body);
        res.send(req.body);
    }
}
