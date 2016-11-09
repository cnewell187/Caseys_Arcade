angular.module('arcade')
    .factory("profileFact", profileFactory);

function profileFactory(){
  var userData = {
    userName: "Bill",
    avatar: "None",
    favoriteGame: "Snake",
    totalPoints: 0,
  }

  return {
    userData: userData,
  }
}
