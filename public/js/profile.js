angular.module('arcade')
    .controller("profileController", profileController);

profileController.$inject = ['$http',"$location","profileFact", "$scope"];

function profileController($http, $location, profileFact, $scope){
  var profCtrl = this;
  profileFact.getUserData();
  profileFact.getOtherUserData();
  profCtrl.userData = profileFact.userData;
  profCtrl.otherUserData= profileFact.otherUserData;
  //profileFact.myGameStats = [];
  profileFact.getMyGameStats();
  profCtrl.myGameStats = profileFact.myGameStats;

  profileFact.getOtherGameStats().then(
  profCtrl.otherGameStats = profileFact.otherGameStats
  )
  profCtrl.otherGameStats = profileFact.otherGameStats
  //profCtrl.otherGameStats = profileFact.otherGameStats;
  console.log("profCtrl.myGameStats: ", profCtrl.myGameStats)

  //console.log(profCtrl)

}
