angular.module('arcade')
    .controller("profileController", profileController);

profileController.$inject = ['$http',"$location","profileFact"];

function profileController($http, $location, profileFact){
  var profCtrl = this;
  profCtrl.userData = profileFact.userData;
  console.log(profCtrl)
}
