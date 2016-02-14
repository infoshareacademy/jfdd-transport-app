(function () {
    angular.module('transport')
        .directive('journeyCompletion', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/app/directives/journeyCompletion.html',
                controller: function ($scope) {

                    $scope.journeyData = $scope.trips;

                    $scope.markComplete = function (index) {
                        //var activeJourney = $scope.journeyData.filter(function (element) {
                        //    return element.active;
                        //});
                        //
                        //activeJourney[0].stages[index].hide = true;
                        //
                        $scope.journeyData
                            .filter(function (element) {
                            return element.active;
                        })[0].stages[index].hide = true;

                        $scope.allStagesCompleted = $scope.journeyData.filter(function (element) {
                                return element.active;
                            })[0].stages.every(checkIfHidden);



                        if($scope.allStagesCompleted) {

                            //$scope.journeyData.active = false;

                            $scope.journeyData.forEach(function (journey) {
                                journey.active = false;
                            });
                            console.log('$scope.journeyData', $scope.journeyData);
                        }
                    };

                    function checkIfHidden (value) {
                        return value.hide;
                    }
                }
            }
        });
}());