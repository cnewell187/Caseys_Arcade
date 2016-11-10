angular.module('arcade')
    .controller("profileController", profileController);

profileController.$inject = ['$http',"$location","profileFact"];

function profileController($http, $location, profileFact){
  var profCtrl = this;
  profileFact.getUserData();
  profCtrl.userData = profileFact.userData;

  //console.log(profCtrl)

}
