(function () {
    var app = angular.module('transport', ['ngMaterial', 'ngMessages']);

    app
        .controller('transportCtrl', function ($scope) {

            var currentTrip;

            $scope.trips = [];

            $scope.flag = false;

            $scope.changeState = function () {
                $scope.flag = true;
            };

            $scope.startNewTrip = function (selectedDate) {
                currentTrip = {};
                currentTrip.date = selectedDate;

                // put the trip in trips array
                $scope.trips.push(currentTrip);
                };

            $scope.addStageToCurrentTrip = function (stop, line, departureTime) {


                currentTrip.stages = currentTrip.stages || [];
                currentTrip.stages.push({
                    stop: stop,
                    line: line,
                    departureTime: departureTime
                });
            };

            $scope.deleteJourney = function () {
                console.log('Not implemented yet');
            };

            $scope.addStop = function (selected) {

                var accumulator = [];

                $scope.filteredLines = $scope.lines.map(function (line) {

                    line.stops.forEach(function (stops) {
                        for (var name in stops) {
                            if (stops.name == selected) {
                                accumulator.push(line);

                            }
                        }
                    });
                });
                $scope.uniqueLines = [];
                $.each(accumulator, function (i, el) {
                    if ($.inArray(el, $scope.uniqueLines) === -1) $scope.uniqueLines.push(el);
                });
            }
        })
})();