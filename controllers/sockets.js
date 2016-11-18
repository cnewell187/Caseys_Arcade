var io = require('socket.io');

module.exports = function(app, port) {
    console.log("Laundering Socks on : ", port);
    var socketServer = io(app.server);
    var sockets =[];
    socketServer.on('connection', function(socket) {
        console.log("Socket Wrenching!");

        socket.on('shout', function(data) {
            console.log("Quiet down! You : ", data.sender);
            socketServer.emit("shout", data)
        });

        socket.on('login', function(data) {
            console.log(data.sender, " is logged in")
            sockets.push({user: data.sender, userSocket: socket})
        });


        socket.on('join', function(data) {
            console.log(data.username, " is joining : ", data.room);

            //the server will put this clients socket in the data.room group
            socket.join(data.room);
            socketServer.to(data.room).emit("talk", {sender:"System", content:data.sender +
          " entered the room"})
        });
        socket.on('leave', function(data) {
            console.log(data.username, " is leaving : ", data.room);
            socket.leave(data.room);
            socketServer.to(data.room).emit("talk", {sender:"System", content:data.sender +
          " left the " +data.room +" room"})
        })

        socket.on('talk', function(data) {
            console.log("Talking Quietly : ", data.sender);
            socketServer.emit("talk", data)
        })

        socket.on('whisper', function(data) {
            var privateSocket = socket.find(function(el){
              return el.user === data.recipient
            })
            if(privateSocket){
            privateSocket.userSocket.emit("talk", data)
          }
        })
    })
}
