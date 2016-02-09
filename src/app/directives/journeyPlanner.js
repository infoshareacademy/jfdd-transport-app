(function () {
    angular.module('transport')

        .directive('journeyPlannerStops', function () {
        return {

            controller:  function($scope, $http) {
                $http.get('https://isa-api.herokuapp.com/transport/stops.json').then(function(response){
                    $scope.stops = response.data;
                    $scope.myStop = $scope.stops[0].name;
                    $scope.selected=[{name: "bajki"}];
                    console.log( $scope.myStop )
                    console.log( $scope.selected )

                    $scope.logStop = function(selected){
                        console.log(selected)
                    }
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
                       $scope.logLine = function(selected){
                           console.log(selected);
                           console.log($scope.lines);


                              var newLines =  $scope.lines.map(function(line)
                               {return line.stops});

                             console.log(newLines);

                           var stopsList = newLines.map(function(stop){
                               return stop})


                           console.log(stopsList);

                        //$scope.finalStopsList = function(){stopsList.forEach(function(name){
                        // console.log (name)
                        //    })}();

                       }
                   })
                }
            }
        });
}());
