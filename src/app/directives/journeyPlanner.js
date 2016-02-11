(function () {
    angular
        .module('transport')
        .directive('journeyPlannerStops', function () {
            return {
                controller:  function($scope, $http) {
                    $http.get('https://isa-api.herokuapp.com/transport/stops.json').then(function(response){
                        $scope.stops = response.data;
                        $scope.myStop = $scope.stops[0].name;
                        $scope.selected=[{name: "bajki"}];
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
                       $scope.lines = response.data;
                       $scope.myLine = $scope.lines[0].name;

                   })
                }
            }
        })
        .directive('yourPlannedJourney', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/app/directives/yourPlannedJourney.html',
                controller: function ($scope) {

                }
            }
        });
}());
