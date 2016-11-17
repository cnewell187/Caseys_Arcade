angular.module('arcade')
    .controller('chatController', chatController);

chatController.$inject = ['$http', "$scope","profileFact", "$location"];

function chatController($http, $scope, profileFact, $location) {


    var chat = this;
    chat.username = "";
    chat.room = window.location.pathname;
    chat.messageHistory = [];
    // var doStuffLater = new Promise(function(resolve, reject){
    //   $http.get("http://api.github.com").then(function(res){
    //     if(res.data){
    //       console.log("The google lives");
    //       resolve(res.data)
    //     }
    //   })
    // })
    // doStuffLater.then(function(data){
    //   console.log("The data from do stuff later: ", data)
    // })
    profileFact.getUserData().then(function(){
    chat.login();
    chat.join()

  })
    chat.userData = profileFact.userData;

    console.log("Trying to open socket")
    var socket = io();
    console.log("Open Socket", socket);

    chat.login = function() {
      console.log("Chat userData: ", chat.userData)
      socket.emit('login', {
          sender: chat.userData.userName,
      });
    };



    chat.sendShout = function() {
        //shout shout, let it all out!
        console.log("Shout, shout, let it all out! from: ", chat.username);
        socket.emit('shout', {
            sender: chat.userData.userName,
            content: chat.message,
        });
        chat.message = '';
    };
    socket.on('shout', function(data) {
        data.sender += "(ALL)";
        console.log("Shout To All Received from: ", data.sender, "The message is: ", data.content)
        chat.messageHistory.push(data)
        $scope.$apply();
    })

    chat.talk = function() {
        //shout shout, let it all out!
        console.log("Talk to ", chat.room, "from ", chat.username);
        if (chat.room) {
            socket.emit('talk', {
                sender: chat.userData.userName,
                content: chat.message
            });
            chat.message = '';
        }
        else{
          console.log("You need to join a room yo!")
        }
    }

    chat.join = function() {
        //shout shout, let it all out!
        console.log("Joining the ", window.location.pathname, " room");
        socket.emit('join', {
            sender: chat.userData.userName,
            room: window.location.pathname,
        });

    };



    chat.leave = function() {
        //shout shout, let it all out!
        console.log("Leaving the room ");
        socket.emit('leave', {
            sender: chat.userData.userName,
            room: chat.room,
        });
        chat.room = '';
    };

    //make a chat.whisper function

    socket.on('talk', function(data) {
        data.sender += "("+chat.room+ ")";
        console.log("Shout To All Received from: ", data.sender, "The message is: ", data.content)
        chat.messageHistory.push(data)
        var objDiv = document.getElementById("chatroom");
              $scope.$apply();
                objDiv.scrollTop = objDiv.scrollHeight;
    })

}
