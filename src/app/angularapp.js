(function(){
    var app = angular.module('transport', ['ngMaterial', 'ngMessages']);

    app.controller('transportCtrl', function ($scope) {
       $scope.app = 'Jupi angular';
    });
})();