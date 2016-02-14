(function () {
    angular.module('transport')
        .directive('journeyCompletion', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/app/directives/journeyCompletion.html',
                controller: function ($scope) {

                    $scope.journeyData = $scope.trips;

                    $scope.markComplete = function (index) {
                        $scope.journeyData
                            .filter(function (element) {
                            return element.active;
                        })[0].stages[index].hide = true;

                        $scope.allStagesCompleted = $scope.journeyData.filter(function (element) {
                                return element.active;
                            })[0].stages.every(checkIfHidden);



                        if($scope.allStagesCompleted) {
                            $scope.journeyData.forEach(function (journey) {
                                journey.active = false;
                            });
                        }
                    };

                    function checkIfHidden (value) {
                        return value.hide;
                    }
                }
            }
        });
}());