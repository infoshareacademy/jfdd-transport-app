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
                            })[0].stages;

                        currentJourney[index].hide = true;

                        var allStagesCompleted = currentJourney.every(checkIfHidden);
                        console.log(allStagesCompleted);
                        if (allStagesCompleted) {
                            $scope.journeyData
                                .filter(function (element) {
                                    return element.id === id;
                                })[0].journeyCompleted = true;
                        }
                        console.log(currentJourney)
                    };

                    function checkIfHidden(value) {
                        return value.hide;
                    }
                }
            }
        });
}());