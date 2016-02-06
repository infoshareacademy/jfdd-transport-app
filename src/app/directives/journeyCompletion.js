angular.module('transport')
    .directive('journeyCompletion', function () {
        return {
            restrict: 'E',
            templateUrl: 'src/app/directives/journeyCompletion.html',
            controller: function ($scope) {
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
            }
        }
    });