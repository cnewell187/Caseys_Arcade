angular.module('arcade')
    .controller("profileController", profileController);

profileController.$inject = ['$http',"$location","profileFact"];

function profileController($http, $location, profileFact){
  var profCtrl = this;
  profileFact.getUserData();
  profileFact.getOtherUserData();
  profCtrl.userData = profileFact.userData;
  profCtrl.otherUserData= profileFact.otherUserData;
  //profileFact.myGameStats = [];
  profileFact.getMyGameStats();
  profCtrl.myGameStats = profileFact.myGameStats;
  console.log("profCtrl.myGameStats: ", profCtrl.myGameStats)

  //console.log(profCtrl)

}
