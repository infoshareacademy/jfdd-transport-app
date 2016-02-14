(function () {
    var app = angular.module('transport', ['ngMaterial', 'ngMessages']);

    app
        .controller('transportCtrl', function ($scope) {

            var currentTrip;

            $scope.trips = [];

            $scope.startNewTrip = function (selectedDate) {
                currentTrip = {};
                currentTrip.date = selectedDate;
                $scope.trips.push(currentTrip);

            };

            $scope.flag = false;

            $scope.changeState = function () {
                $scope.flag = true;
                $scope.allStagesCompleted = false;
            };

            $scope.addStageToCurrentTrip = function (stop, line, departureTime) {

                $scope.hideValue = true;
                currentTrip.stages = currentTrip.stages || [];
                currentTrip.stages.push({
                    stop: stop,
                    line: line,
                    departureTime: departureTime
                });
            };

            //$scope.deleteJourney = function () {
            //    console.log('Not implemented yet');
            //};

            $scope.addStop = function (selected) {

                $scope.accumulator = [];

                $scope.filteredLines = $scope.lines.map(function (line) {

                    line.stops.forEach(function (stops) {
                        for (var name in stops) {
                            if (stops.name == selected) {
                                $scope.accumulator.push(line);

                            }
                        }
                    });
                });
                $scope.uniqueLines = [];
                $.each($scope.accumulator, function (i, el) {
                    if ($.inArray(el, $scope.uniqueLines) === -1) $scope.uniqueLines.push(el);
                });
            }

            $scope.addLine = function(selected) {

                var toHHMM = function (seconds_parameter) {
                    var sec_num = parseInt(seconds_parameter, 10);  // don't forget the radix in the second param
                    var hours = Math.floor(sec_num / 3600);
                    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);

                    if (hours < 10) {
                        hours = "0" + hours;
                    }
                    if (minutes < 10) {
                        minutes = "0" + minutes;
                    }
                    var time = hours + ':' + minutes;
                    return time;
                };

                var matchingStopArrayIndex = selected.stops.indexOf($scope.myStop.name);
                var sumPreviousAndCurrentElementForReduce = function(a, b) {
                        return a + b;
                    };
                var timeFromStartingStopToGivenInSeconds = selected.dTimes.slice(0, matchingStopArrayIndex + 1).reduce(sumPreviousAndCurrentElementForReduce, 0);

                var singleLineDepartures = selected.departures.map(function (singleDepartureTime) {
                    var departureTimesInSeconds = singleDepartureTime.hour * 3600 + singleDepartureTime.minutes * 60 + singleDepartureTime.seconds;
                    var departureTimeOnCurrentStop = (departureTimesInSeconds + timeFromStartingStopToGivenInSeconds) % 86400; // 86400s = 24h
                    var departureTimeOnCurrentStopHHMM = toHHMM(departureTimeOnCurrentStop);
                    return departureTimeOnCurrentStopHHMM;
                });
                console.log(singleLineDepartures);
                $scope.myTime = singleLineDepartures;

                $scope.times = $scope.myTime[0]
            }

            $scope.addHour = function(selected){

                console.log('wartosc ' + selected)

                $scope.mySelectedTime = selected
            }
        })
})();