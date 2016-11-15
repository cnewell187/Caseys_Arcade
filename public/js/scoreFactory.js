angular.module('arcade')
    .factory("scoreFact", scoreFactory);

scoreFactory.$inject = ['$http',"$location","profileFact"];

function scoreFactory($http, $location, profileFact){
  var main = this;
  main.leaderboardData =[]
  function getLeaderboard(game){
    $http({
        method: 'GET',
        url: '/snakeLeaderboard'
    }).then(function(res) {
        console.log("The leaderboard data")
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {

            var leaderData = {
                gameUser: res.data[i].gameUser,
                highscore: res.data[i].highscore
            }

            main.leaderboardData.push(leaderData)

        }
        console.log(main.leaderboardData)

    })
  }

  return{
    getLeaderboard: getLeaderboard
  }

}
