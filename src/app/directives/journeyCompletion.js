(function () {
    angular.module('transport')
        .directive('journeyCompletion', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/app/directives/journeyCompletion.html',
                controller: function ($scope) {
                    $scope.markComplete = function (index) {
                        $scope.plannedJourneys[index].hide = true;
                        $scope.allStagesCompleted = $scope.plannedJourneys.every(checkIfHidden);
                    };

                    function checkIfHidden (value) {
                        return value.hide;
                    }
                }
            }
        });
}());