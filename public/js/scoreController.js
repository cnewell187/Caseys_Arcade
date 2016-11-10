angular.module('arcade')
    .controller("scoreController", scoreController);

scoreController.$inject = ['$http',"$location","profileFact"];

function scoreController($http, $location, profileFact){
  var profCtrl = this;
  profCtrl.userData = profileFact.userData;
  console.log(profCtrl)

}
