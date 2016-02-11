(function () {
    var app = angular.module('transport');

    app.controller('journeyPlannerCtrl', function ($scope) {

        $scope.flag = false;

        $scope.changeState = function () {
            $scope.flag = true;
        };

        $scope.plannedJourneys = [
            {
                date: '2016-02-27',
                stages: [
                    {
                        stop: 'Migowo',
                        line: 127,
                        departure: (new Date).getTime()
                    },
                    {
                        stop: 'Gdańsk Wrzeszcz',
                        line: 127,
                        departure: (new Date).getTime()
                    },
                    {
                        stop: 'Hala Olivia',
                        line: 127,
                        departure: (new Date).getTime()
                    }
                ]
            }
        ];
    });
})();