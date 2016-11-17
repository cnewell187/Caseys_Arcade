angular.module('arcade')
    .controller("userController", userController);

userController.$inject = ['$http',"$location","profileFact"];

function userController($http, $location, profileFact) {
    var userCtrl = this;
    userCtrl.login = function() {
        console.log("Submitting")
        $http({
            method: 'POST',
            url: '/login',
            data: {
                email: userCtrl.email,
                password: userCtrl.password
            },
        }).then(function(res) {
                console.info(res.data);
                console.log(res.data.message)
                if(res.data.message === "Pass"){
                  console.log("changing location")
                  console.log("Factory Info: ", profileFact)
                  profileFact.userData.userName = res.data.userName
                  $location.url("/profile")
                }
                else{
                  $location.url("/fail")
                }
            },

            function(err) {
                //helps to debug errors on the front end yo!
                $location.url("/fail")
                console.error(err);
            })
    }

    userCtrl.register = function() {
        console.log("Registering!")

        $http({
            method: 'POST',
            url: '/register',
            data: {
                email: userCtrl.email,
                userName: userCtrl.username,
                realName: userCtrl.realname,
                password: userCtrl.password
            },
        }).then(function(res) {
                console.info(res.data);

            },

            function(err) {
                //helps to debug errors on the front end yo!
                console.error(err);
            })
    }

}
