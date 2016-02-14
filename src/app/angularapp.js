(function () {
    var app = angular.module('transport', ['ngMaterial', 'ngMessages']);

    app
        .controller('transportCtrl', function ($scope) {

            var currentTrip;

            $scope.trips = [];

            $scope.startNewTrip = function (selectedDate) {
                $scope.selectedDate = selectedDate;
                $scope.hideValue = false;
                $scope.currentTrip = {};
                $scope.currentTrip.date = selectedDate;
                $scope.trips.push($scope.currentTrip);

            };

            $scope.flag = false;

            $scope.changeState = function () {
                $scope.flag = true;
            };

            $scope.addStageToCurrentTrip = function (stop, line, departureTime) {


                if($scope.trips.length === 0){  $scope.hideValue = true; $scope.hidden = true; return}
                else {
                    $scope.hideValue = true;
                    $scope.hidden = false;
                    $scope.currentTrip.stages =  $scope.currentTrip.stages || [];
                    $scope.currentTrip.stages.push({
                        stop: stop,
                        line: line,
                        departureTime: departureTime,
                        date: $scope.selectedDate
                    });
                }

                console.log($scope.trips)
            };

            $scope.removeItem = function(item) {
                console.log(item)
                var index = $scope.trip.stages.indexOf(item);
                if (index != -1) {
                    $scope.trip.stages.splice(index, 1);
                    console.log($scope.trip.stages)
                }
            };
            $scope.saveIndex = function (index){
                console.log($scope.trips)
                $scope.deleteButtonShow = true
                $scope.tripToBeModified = index
            }
            $scope.deleteJourney = function (index, stage) {
                //var zmienna = stage[0]
                //stage.forEach(function(object){console.log(object)})
                //console.log(zmienna)
                console.log($scope.currentTrip.date)
                console.log($scope.currentTrip.stages[index].date)
                //if($scope.currentTrip.date == $scope.currentTrip.stages[index].date){
                delete  $scope.currentTrip.stages[index]
                console.log( $scope.currentTrip)
                //console.log(stage)
                //console.log($scope.currentTrip)
                //console.log($scope.currentTrip.stages[index])
                //console.log($scope.currentTrip.date)
                //console.log($scope.currentTrip.stages[index].date)
                //var obiekt = $scope.currentTrip
                //var podobiekt = $scope.currentTrip.stages[index]
                //delete obiekt[podobiekt];
                //console.log(obiekt)

                //if($scope.currentTrip.date == $scope.currentTrip.stages[index].date){
                //    console.log($scope.currentTrip)
                //    var obiekt = $scope.currentTrip
                //    var podobiekt = $scope.currentTrip.stages[index]
                //    delete obiekt[podobiekt];
                //    console.log(obiekt)
                //}
                //console.log(index)
                //$scope.trips.forEach(function(date){ console.log($scope.currentTrip.date)})
                //console.log($scope.trips)
                //delete $scope.trips[index].stages
                //console.log($scope.trips[index])

            };

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
            };

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

                $scope.myTime = singleLineDepartures;
                $scope.times = $scope.myTime[0].name
            };

            $scope.addHour = function(selected){
                $scope.mySelectedTime = selected
            }
        })
})();