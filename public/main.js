angular.module('arcade', ['ngRoute'])
    .controller("joystickController", joystick);

joystick.$inject = ['$http'];

angular.module("arcade").config(gameRoutes);


gameRoutes.$inject = ["$routeProvider"];

function gameRoutes($routeProvider) {
    $routeProvider.when('/', {
            templateUrl: "/html/landingPage.html"
        })
        .when('/games', {
            templateUrl: "/html/games.html",
        })
        .when('/about', {
            templateUrl: "/html/about.html",
        })
        .when('/contact', {
            templateUrl: "/html/contact.html",
        })
        .when('/fail', {
            templateUrl: "/html/turnBack.html",
        })
        .otherwise({
            redirectTo: "/fail",
        })
};

function joystick($http) {
    var joy = this;
    joy.newUser = {};
    joy.greeting = "You are now under our control, do not attempt to change the channel";
    joy.addUser = function() {
        console.log("New User: ",
            joy.newUser);
        $http.post('/api/user/', joy.newUser)
            .then(function(res) {
                console.log("Response: ", res)
            });
        joy.newUser = {};
    }
}
