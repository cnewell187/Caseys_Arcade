angular.module('arcade')
    .factory("profileFact", profileFactory);

profileFactory.$inject = ['$http', '$cookies'];

function profileFactory($http, $cookies) {
    var pro = this;


    var userData = {
        userName: "Bill",
        avatar: "None",
        favoriteGame: "Snake",
        totalPoints: 0,
    }

    function getUserData() {


            $http.get('/userData').then(function(responseData) {
                console.log("The response data from profile factory: ", responseData)
                userData.userName = responseData.data.userName
                userData.logoutStatus = responseData.data.logoutStatus
                userData.registerStatus=responseData.data.registerStatus
                console.log(userData.registerStatus)
            })

    }

    return {
        userData: userData,
        getUserData:getUserData
    }
}
