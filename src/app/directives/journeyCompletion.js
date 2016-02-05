angular.module('transport')
    .directive('journeyCompletion', function () {
        return {
            restrict: 'E',
            templateUrl: 'src/app/directives/journeyCompletion.html',
            controller: function ($scope) {
                $scope.date = new Date();
                $scope.busStop = 'Migowo';
                $scope.lineNo = '127';
                $scope.departure = (new Date).getTime();
            }
        }
    });