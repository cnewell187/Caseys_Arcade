angular.module('arcade')
    .factory("profileFact", profileFactory);

profileFactory.$inject = ['$http', '$cookies', '$location', '$routeParams'];

function profileFactory($http, $cookies, $location, $routeParams) {
    var profCtrl = this;
    // console.log("The Route Params: ", $routeParams)
    var pro = this;
    var userData = {
        userName: "Karl",
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
        // console.log("The Route Params: ", $routeParams)
        return $http.get('/userData').then(function(responseData) {
            // console.log("The response data from profile factory: ", responseData)
            userData.userName = responseData.data.userName
            userData.logoutStatus = responseData.data.logoutStatus
            userData.logoutStatus2 = responseData.data.logoutStatus2
            userData.registerStatus = responseData.data.registerStatus
            userData.totalPoints = responseData.data.totalPoints

        })
    }

    function getOtherUserData(userName) {

        $http.get('/otherUserData/' + $routeParams.userName).then(function(responseData) {
            //console.log("The response data from profile factory: ", responseData)
            otherUserData.userName = responseData.data.userName
            otherUserData.logoutStatus = responseData.data.logoutStatus
            otherUserData.logoutStatus2 = responseData.data.logoutStatus2
            otherUserData.registerStatus = responseData.data.registerStatus
                // console.log("The other userData: ", otherUserData)
                //console.log(userData.registerStatus)
        })

    }

    function getMyGameStats() {

        $http.get('/getMyGameStats/').then(function(responseData) {
            //myGameStats =[];

            // console.log("The response Data from getMyGameStats: ", responseData)

            if (myGameStats.length === 0) {
                for (var i = 0; i < responseData.data.length; i++) {
                    myGameStats.push(responseData.data[i])
                }
            }
            // console.log("My game Stats from profileFactory: ", myGameStats)
        })

    }

    function getOtherGameStats() {

        if ($routeParams.userName) {
          console.log("The routeParams for profile fact: ", $routeParams.userName)
            return $http.get('/getOtherGameStats/' + $routeParams.userName).then(function(responseData) {
                //myGameStats =[];

                console.log("The response Data from getOtherGameStats: ", responseData)

                if (otherGameStats.length === 0) {
                    for (var i = 0; i < responseData.data.length; i++) {
                        otherGameStats.push(responseData.data[i])
                    }
                }
                else{
                  otherGameStats.splice(0, otherGameStats.length);
                  for (var i = 0; i < responseData.data.length; i++) {
                      otherGameStats.push(responseData.data[i])
                  }
                }
                console.log("Other game Stats from profileFactory: ", otherGameStats)


            })
        } else {
            return $http.get('/getOtherGameStats/' + "1").then(function(responseData) {
                //myGameStats =[];

                console.log("The response Data from getMyGameStats: ", responseData)

                if (otherGameStats.length === 0) {
                    for (var i = 0; i < responseData.data.length; i++) {
                        otherGameStats.push(responseData.data[i])
                    }
                }

                else{
                  otherGameStats.splice(0, otherGameStats.length);
                  for (var i = 0; i < responseData.data.length; i++) {
                      otherGameStats.push(responseData.data[i])
                  }
                }
                console.log("Other game Stats from profileFactory: ", otherGameStats)


            })
        }
    }



    return {
        userData: userData,
        getMyGameStats: getMyGameStats,
        otherUserData: otherUserData,
        otherGameStats: otherGameStats,
        getOtherGameStats: getOtherGameStats,
        getUserData: getUserData,
        getOtherUserData: getOtherUserData,
        myGameStats: myGameStats
    }
}
