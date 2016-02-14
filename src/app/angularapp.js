(function () {
    var app = angular.module('transport', ['ngMaterial', 'ngMessages']);

    app
        .controller('transportCtrl', function ($scope) {

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
            };


            $scope.deleteEntireJourney = function (journeyIndex) {

                var elementToBeRemoved = angular.element(document.querySelector( '#journeyButtonId' + journeyIndex));
                var goToCompletionButtonToBeRemoved = angular.element(document.querySelector('#goToCompletionButtonId' + journeyIndex ));
                var tripDateDivToBeRemoved = angular.element(document.querySelector('#tripDateId' + journeyIndex ));
                var journeyDivToBeRemoved = angular.element(document.querySelector('#journeyId' + journeyIndex ));


                goToCompletionButtonToBeRemoved.remove();
                elementToBeRemoved.remove();
                tripDateDivToBeRemoved.remove();
                journeyDivToBeRemoved.html('<p class="infoTripDeleted">Podróż została usunięta</p>');


                delete $scope.trips[journeyIndex];
        };



            $scope.deleteJourney = function (stageIndex, journeyIndex) {

                var journeyDeleteButtonToBeRemoved = angular.element(document.querySelector( '#stageButtonId' + stageIndex));
                var divCompletedToBeChanged = angular.element(document.querySelector('#divCompleted' + stageIndex ));
                //var stageDivToBeRemoved = angular.element(document.querySelector('#stageId' + stageIndex ));

                journeyDeleteButtonToBeRemoved.remove();
                divCompletedToBeChanged.html('<p class="infoTripDeleted">Ten etap podróży został usunięty z planowanych</p>');
                //stageDivToBeRemoved.html('<p class="infoTripDeleted">Ten etap podróży został usunięty</p>');

                delete journeyIndex.stages[stageIndex];
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