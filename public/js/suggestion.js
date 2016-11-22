angular.module('arcade')
    .controller("sugController", sugController);

sugController.$inject = ['$http'];

function sugController($http) {
    var sug = this;
    sug.submit = function() {
        console.log("Submitting a Suggestion!")

        $http({
            method: 'POST',
            url: '/suggestion',
            data: {
                email: sug.email,
                firstName: sug.firstName,
                lastName: sug.lastName,
                message: sug.message,
                phone: sug.phone,
            },
        }).then(function(res) {
                console.info(res.data);
                sug.email = '';
                sug.firstName = '';
                sug.lastName = "";
                sug.message = "";
                sug.phone = "";

            },

            function(err) {
                //helps to debug errors on the front end yo!
                console.error(err);
            })
    }
}
