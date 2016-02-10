(function(){
    var app = angular.module('transport', ['ngMaterial', 'ngMessages']);

    app.controller('transportCtrl', function ($scope, $interval) {
       $scope.app = 'Jupi angular';
        $scope.getFavStop = getFavStop;
        $scope.favStop = "test";
        $interval(function () {
            $scope.favStop = getFavStop();
        },10);

        function getFavStop(){
            var loggerDataArray =  JSON.parse(localStorage.getItem("Logger")) || [];
            var favStopsArray = loggerDataArray.filter(function (o) {
                if('FavStop' in o){
                    return true;
                }
            } );
            var counterForFavedStopsObject = {};
            favStopsArray.forEach(function (obj) {
                var stopName = obj.FavStop;
                if (counterForFavedStopsObject[stopName] !== undefined)
                {
                    counterForFavedStopsObject[stopName]++;
                } else {
                    counterForFavedStopsObject[stopName] = 1;
                }
            });

            var maximumFavedCount = 0;
            var mostFavedStop;
            for (var busStopProperty in counterForFavedStopsObject) {
                if (counterForFavedStopsObject[busStopProperty]>maximumFavedCount) {
                    maximumFavedCount = counterForFavedStopsObject[busStopProperty];
                    mostFavedStop = busStopProperty;
                }


            }
            return 'Przystanek: ' + mostFavedStop + '. Wybrany: ' + maximumFavedCount + ' razy.';
        };
    });

})();