(function () {
    angular.module('transport')
        .directive('journeyCompletion', function () {
            return {
                restrict: 'E',
                scope: true,
                templateUrl: 'src/app/directives/journeyCompletion.html',
                controller: function ($scope) {

                    $scope.journeyData = $scope.$parent.trips;

                    $scope.markComplete = function (index) {
                        $scope.journeyData[index].hide = true;
                        $scope.allStagesCompleted = $scope.journeyData.every(checkIfHidden);
                    };

                    function checkIfHidden (value) {
                        return value.hide;
                    }
                }
            }
        });
}());