(function () {
    angular.module('transport')
        .directive('journeyCompletion', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/app/directives/journeyCompletion.html',
                controller: function ($scope) {

                    $scope.journeyData = $scope.trips;

                    $scope.markComplete = function (index, id) {
                        var currentJourney = $scope.journeyData
                            .filter(function (element) {
                                return element.id === id;
                            })[0];

                        currentJourney.stages[index].hide = true;
                     
                        var allStagesCompleted = currentJourney.stages.every(checkIfHidden);
                        if (allStagesCompleted) {
                            currentJourney.journeyCompleted = true;
                        }
                    };

                    function checkIfHidden(value) {
                        return value.hide;
                    }
                }
            }
        });
}());
