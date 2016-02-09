(function(){
    var app = angular.module('transport')

    .config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('YYYY-MM-DD');
        };
    });

    app.controller('AppCtrl', function($scope) {
        $scope.myDate = new Date();
        $scope.addDate = function(selected){
            $scope.travelObject['date']= selected;
            console.log( $scope.travelObject)
        }

    });
})();