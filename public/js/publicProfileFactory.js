angular.module('arcade')
    .factory("publicFact", publicFactory);

publicFactory.$inject = ['$http', '$cookies', '$location'];

function publicFactory($http, $cookies,$location) {
    var pro = this;

    var otherUserData = {
        userName: "Bill",
        avatar: "None",
        favoriteGame: "Snake",
        totalPoints: 0,
    }

    function getOtherUserData(userName) {
      $location.path('/publicProfile/'+userName)
        $http.get('/otherUserData/'+ userName).then(function(responseData) {
            //console.log("The response data from profile factory: ", responseData)
            otherUserData.userName = responseData.data.userName
            otherUserData.logoutStatus = responseData.data.logoutStatus
            otherUserData.logoutStatus2 = responseData.data.logoutStatus2
            otherUserData.registerStatus = responseData.data.registerStatus
            //console.log(userData.registerStatus)
        })
    }

    return {
        userData: userData,
        getUserData: getUserData,
        getOtherUserData: getOtherUserData
    }
}
