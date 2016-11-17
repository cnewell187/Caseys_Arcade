angular.module('arcade', ['ngRoute', "ngCookies"])
    .controller("joystickController", joystick);


joystick.$inject = ['$http', 'profileFact', 'scoreFact', '$location'];

gameRoutes.$inject = ["$routeProvider"];

angular.module("arcade").config( gameRoutes);






function gameRoutes($routeProvider) {
    $routeProvider.when('/', {
            templateUrl: "/html/landingPage.html"
        })
        .when('/games', {
            templateUrl: "/html/games.html",
        })
        .when('/profile', {
            templateUrl: "/html/profile.html",
            controller: 'profileController',
            controllerAs: 'profCtrl'
        })
        .when('/publicProfile/:userName*', {
            templateUrl: "/html/publicProfile.html",
            controller: 'profileController',
            controllerAs: 'profCtrl'
        })
        .when('/about', {
            templateUrl: "/html/about.html",
        })
        .when('/guacAMole', {
            templateUrl: "/html/guacAMole.html",
        })
        .when('/snake', {
            templateUrl: "/html/snake.html",
        })
        .when('/tetris', {
            templateUrl: "/html/tetris.html",
        })
        .when('/contact', {
            templateUrl: "/html/contact.html",
        })
        .when('/leaderboards', {
            templateUrl: "/html/leaderboards.html",
        })
        .when('/fail', {
            templateUrl: "/html/turnBack.html",
        })
        .when('/login', {
            templateUrl: "/html/login.html",
            controller: 'userController',
            controllerAs: 'userCtrl'
        })
        .when('/register', {
            templateUrl: "html/register.html",
            controller: 'userController',
            controllerAs: 'userCtrl'
        })
        .otherwise({
            redirectTo: "/fail",
        })
};

function joystick($http, profileFact, scoreFact, $location) {

  //$locationProvider.html5Mode(true);
    var joy = this;
    joy.newUser = {};
    joy.greeting = "You are now under our control, do not attempt to change the channel";
    profileFact.getUserData();
    joy.userData = profileFact.userData;
    joy.otherUserData =profileFact.otherUserData;
    joy.snakeLeaderboard = [];
    joy.guacAMoleLeaderboard =[];
    joy.tetrisLeaderboard = [];


    joy.getLeaderboard = function(game) {
        $http({
            method: 'GET',
            url: '/' + game,
        }).then(function(res) {
            console.log("The leaderboard data")
            console.log(res.data)
            for (var i = 0; i < res.data.length; i++) {
                console.log("Doing the loop!")
                var leaderData = {
                    gameUser: res.data[i].gameUser,
                    highscore: res.data[i].highscore
                }
                console.log("The leaderData: ", leaderData)
                joy[game].push(leaderData)
            }
            console.log(joy.snakeLeaderboard)
        })
    }
    joy.getLeaderboard("snakeLeaderboard");
    joy.getLeaderboard('guacAMoleLeaderboard')
    joy.getLeaderboard('tetrisLeaderboard')
  //   scoreFact.getLeaderboard();
  //   joy.snakeLeaderboard = scoreFact.leaderboardData
  //  console.log(scoreFact.leaderboardData, "Booop")

  joy.moveToProfile = function(userName){
    console.log("Moving to: ", userName )
    $location.path('/publicProfile/'+userName)

  }
}
