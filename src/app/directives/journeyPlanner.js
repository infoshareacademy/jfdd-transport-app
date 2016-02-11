(function () {
    angular
        .module('transport')
        .directive('journeyPlannerStops', function () {
            return {
                controller:  function($scope, $http) {
                    $http.get('https://isa-api.herokuapp.com/transport/stops.json').then(function(response){
                        $scope.$parent.stops = response.data;
                        $scope.$parent.myStop = $scope.stops[0].name;
                        $scope.$parent.selected=[{name: "bajki"}];
                    })
                }
            }
        })
        .directive('journeyPlannerLines', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/app/directives/journeyPlanner.html',
                scope: true,

                controller: function($scope, $http) {
                   $http.get('https://isa-api.herokuapp.com/transport/lines.json').then(function(response){
                       $scope.$parent.lines = response.data;
                       $scope.$parent.myLine = $scope.$parent.lines[0].name;

                       //$scope.addLine = function(selected){
                       //    $('#disabledSelect4').attr('disabled',false);
                       //}
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
