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
                    $scope.plannedJourneys = [
                        {
                            date: new Date(),
                            busStop: 'Migowo',
                            lineNo: '127',
                            departure: (new Date).getTime()
                        },
                        {
                            date: new Date(),
                            busStop: 'Gdańsk Wrzeszcz',
                            lineNo: '122',
                            departure: (new Date).getTime()
                        },
                        {
                            date: new Date(),
                            busStop: 'Hala Olivia',
                            lineNo: '199',
                            departure: (new Date).getTime()
                        }
                    ];

                    function checkIfHidden (value) {
                        return value.hide;
                    }
                }
            }
        });
}());