(function(){
    var app = angular.module('transport', ['ngMaterial', 'ngMessages']);

    app.controller('transportCtrl', function ($scope) {
       $scope.app = 'Jupi angular';
        $scope.getFavStop = getFavStop;

        function getFavStop(){
            var array =  JSON.parse(localStorage.getItem("Logger")) || [];
            var a = array.filter(function (o) {
                if('FavStop' in o){
                    return true;
                }
            } );
            var counterObject = {};
            var b = a.forEach(function (obj) {
                var stopName = obj.FavStop;
                if (counterObject[stopName] !== undefined)
                {
                    counterObject[stopName]++;
                } else {
                    counterObject[stopName] = 1;
                }
            });

            counterObject;
            counterObject;
            counterObject;
            var maxFav = 0;
            var maxBus;
            for (busStopProperty in counterObject) {
                if (counterObject[busStopProperty]>maxFav) {
                    maxFav = counterObject[busStopProperty];
                    maxBus = busStopProperty;
                }


            }

            return "Najczesicej wybierany przystanek to: " + busStopProperty + ". Wybrany: " + maxFav + " razy.";
        };
    });

})();