(function () {
    angular.module('transport')

        .directive('journeyPlannerStops', function () {
        return {

            controller:  function($scope, $http) {
                $http.get('https://isa-api.herokuapp.com/transport/stops.json').then(function(response){
                    $scope.stops = response.data
                })
            }
        }
    })
        .directive('journeyPlannerLines', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/app/directives/journeyPlanner.html',

                controller: function($scope, $http) {
                   $http.get('https://isa-api.herokuapp.com/transport/lines.json').then(function(response){
                       $scope.lines = response.data
                   })
                }
            }
        });
}());