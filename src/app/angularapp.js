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

            for (busStopProperty in counterObject) {
                var currCount = counterObject[busStopProperty];

                if (currCount > highestCount)
                var highestCount = counterObject[busStopProperty];

                var maxBus;
                var maxCount;
                var currBus = busStopProperty;
                var currCount = counterObject[busStopProperty];
            }

        };
    });

})();