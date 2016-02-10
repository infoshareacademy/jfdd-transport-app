
(function(){
    var app = angular.module('transport');

    app.controller('transportCtrl', function ($scope) {

        $scope.travelObject = {
            date: new Date(),
            busStop:"Nie wybrano przystanku",
            line: "Nie wybrano linii",
            time:(new Date).getTime()
        };

        $scope.Hello = function(){



            $scope.newTravelObject = {
                date: $scope.travelObject['date'],
                busStop: $scope.travelObject['busStop'],
                line: $scope.travelObject['line'],
                time:(new Date).getTime()
            };

         $scope.hideValue = true;
         console.log('hello')}




        $scope.addStop = function(selected){

            $scope.travelObject['busStop'] = selected;

            $('#disabledSelect3').attr('disabled',false);

            $scope.accumulator = [];

            $scope.filteredLines = $scope.lines.map(function(line) {

                line.stops.forEach(function (stops) {

                    for(name in stops){
                        if(stops.name== selected) {
                            $scope.accumulator.push(line);

                        }
                    }
                });
            });
            $scope.uniqueLines = [];
            $.each($scope.accumulator, function(i, el){
                if($.inArray(el, $scope.uniqueLines) === -1) $scope.uniqueLines.push(el);
            });

            //$scope.form = {type : $scope.uniqueLines[0].value};
            $scope.linesToDisplay = $scope.uniqueLines

        }

    })
})();