//MASTER ROUTING FILE!
var dashboard = require("./controllers/dashboard.js");
var api = require("./controllers/api.js");
module.exports = function(app) {
    app.get('/' ,function(req, res) {
        res.send("Yo");
    })
    app.get('/dashboard', dashboard.root)
    app.get('/dashboard/settings', dashboard.settings)
    app.get('/api/users', api.getAll)
    app.get('/api/user', api.getUser)
    app.post('/api/user', api.add)
}
