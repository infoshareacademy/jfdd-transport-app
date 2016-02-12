(function () {
    angular.module('transport')
        .directive('journeyCompletion', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/app/directives/journeyCompletion.html',
                controller: function ($scope) {

                    $scope.journeyData = $scope.trips;

                    $scope.markComplete = function (index) {
                        var activeJourney = $scope.journeyData.filter(function (element) {
                            return element.active;
                        });

                        activeJourney[0].stages[index].hide = true;
                        $scope.allStagesCompleted = activeJourney[0].stages.every(checkIfHidden);
                    };

                    function checkIfHidden (value) {
                        return value.hide;
                    }
                }
            }
        });
}());