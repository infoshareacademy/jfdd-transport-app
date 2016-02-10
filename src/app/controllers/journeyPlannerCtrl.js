(function () {
    var app = angular.module('transport');

    app.controller('journeyPlannerCtrl', function ($scope) {

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
    });
})();