angular.module('arcade')
    .factory("profileFact", profileFactory);

profileFactory.$inject = ['$http', '$cookies', '$location', '$routeParams'];

function profileFactory($http, $cookies, $location, $routeParams) {
    var profCtrl = this;
    console.log("The Route Params: ", $routeParams)
    var pro = this;
    var userData = {
        userName: "Bill",
        avatar: "None",
        favoriteGame: "Snake",
        totalPoints: 0,
    }
    var otherUserData = {
        userName: "Bill",
        avatar: "None",
        favoriteGame: "Snake",
        totalPoints: 0,
    }
    var myGameStats = [];

    var otherGameStats = [];
    function getUserData() {
        console.log("The Route Params: ", $routeParams)
        $http.get('/userData').then(function(responseData) {
            console.log("The response data from profile factory: ", responseData)
            userData.userName = responseData.data.userName
            userData.logoutStatus = responseData.data.logoutStatus
            userData.logoutStatus2 = responseData.data.logoutStatus2
            userData.registerStatus = responseData.data.registerStatus
            userData.totalPoints = responseData.data.totalPoints
            console.log(userData.registerStatus)
        })
    }

    function getOtherUserData(userName) {

        $http.get('/otherUserData/' + $routeParams.userName).then(function(responseData) {
            //console.log("The response data from profile factory: ", responseData)
            otherUserData.userName = responseData.data.userName
            otherUserData.logoutStatus = responseData.data.logoutStatus
            otherUserData.logoutStatus2 = responseData.data.logoutStatus2
            otherUserData.registerStatus = responseData.data.registerStatus
            console.log("The other userData: ", otherUserData)
                //console.log(userData.registerStatus)
        })

    }

    function getMyGameStats() {

        $http.get('/getMyGameStats/').then(function(responseData) {
          //myGameStats =[];

            console.log("The response Data from getMyGameStats: ", responseData)

            if(myGameStats.length === 0){
            for(var i = 0; i< responseData.data.length; i++){
              myGameStats.push(responseData.data[i])
            }
          }
            console.log("My game Stats from profileFactory: ", myGameStats)
        })

    }

    return {
        userData: userData,
        getMyGameStats: getMyGameStats,
        otherUserData: otherUserData,
        otherGameStats: otherGameStats,
        getUserData: getUserData,
        getOtherUserData: getOtherUserData,
        myGameStats: myGameStats
    }
}
