angular.module('arcade')
    .controller("profileController", profileController);

profileController.$inject = ['$http',"$location","profileFact"];

function profileController($http, $location, profileFact){
  var profCtrl = this;
  profileFact.getUserData();
  profileFact.getOtherUserData();
  profCtrl.userData = profileFact.userData;
  profCtrl.otherUserData= profileFact.otherUserData;
  profileFact.getMyGameStats();

  //console.log(profCtrl)

}
