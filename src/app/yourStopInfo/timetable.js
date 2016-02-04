ns('app.yourStopInfo.timetable', function () {
    var timetables = {};
    var toHHMMSS;
    var cachedJson;
    var prepareTimetables;

    toHHMMSS = function (seconds_parameter) {
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

    cachedJson = null;
    prepareTimetables = function (jsonWithPublicTransportLines) {
        var stopsFromLocalStorageArray;

        for (var i in timetables) {
            delete timetables[i];
        }
        if (jsonWithPublicTransportLines === undefined) {
            jsonWithPublicTransportLines = cachedJson;
        } else {
            cachedJson = jsonWithPublicTransportLines;
        }

        stopsFromLocalStorageArray = app.pickYourStops.model.user.favouriteStops();
        stopsFromLocalStorageArray.forEach(function (singleStopNameFromLocalStorageArray) {
            var isStopFromJsonEqualToStopFromLocalStorage;
            var getStopEqualToStopFromLocalStorage;
            var sumPreviousAndCurrentElementForReduce;
            var linesContainingStopFromLocalStorageArray;

            timetables[singleStopNameFromLocalStorageArray] = timetables[singleStopNameFromLocalStorageArray] || [];

            isStopFromJsonEqualToStopFromLocalStorage = function (publicTransportStop) {
                return publicTransportStop.name === singleStopNameFromLocalStorageArray;
            };

            getStopEqualToStopFromLocalStorage = function (singlePublicTransportLine) {
                return singlePublicTransportLine.stops.find(isStopFromJsonEqualToStopFromLocalStorage);
            };

            sumPreviousAndCurrentElementForReduce = function(a, b) {
                return a + b;
            };

            linesContainingStopFromLocalStorageArray = jsonWithPublicTransportLines.filter(getStopEqualToStopFromLocalStorage);

            linesContainingStopFromLocalStorageArray.forEach(function (singleLine) {
                var lineNumber = singleLine.id;
                var matchingStopFromJsonAgainstLocalStorage = singleLine.stops.find(isStopFromJsonEqualToStopFromLocalStorage);
                var matchingStopArrayIndex = singleLine.stops.indexOf(matchingStopFromJsonAgainstLocalStorage);


                var timeOfJourneyBackFromLastStopToGivenStopInSeconds = singleLine.dTimes.slice(matchingStopArrayIndex).concat(0).reverse().reduce(sumPreviousAndCurrentElementForReduce, 0);


                var totalTimeFromTheBeginningToEndOfLineInSeconds = singleLine.dTimes.reduce(sumPreviousAndCurrentElementForReduce);


                singleLine.departuresReverseDirection = singleLine.departures.map(function (singleDepartureTime) {
                    var departureTimesInSeconds = singleDepartureTime.hour * 3600 + singleDepartureTime.minutes * 60 + singleDepartureTime.seconds;
                    var timeOfArrivalToLastStopinSecondsModulo24h = (departureTimesInSeconds + totalTimeFromTheBeginningToEndOfLineInSeconds) % 86400; // 86400s = 24h
                    //var
                });


                // get the time in second from starting stop to given stop
                var time = singleLine.dTimes.slice(0, matchingStopArrayIndex + 1).reduce(sumPreviousAndCurrentElementForReduce, 0);

                var depTimesInSeconds = 0;

                var singleLineDepartures = singleLine.departures.map(function (singleDepartureTime) {
                    var departureTimesInSeconds = singleDepartureTime.hour * 3600 + singleDepartureTime.minutes * 60 + singleDepartureTime.seconds;
                    var departureTimeOnCurrentStop = (departureTimesInSeconds + time) % 86400; // 86400s = 24h
                    var departureTimeOnCurrentStopHHMMSS = toHHMMSS(departureTimeOnCurrentStop);
                    return departureTimeOnCurrentStopHHMMSS;
                });

                var sortedDepartures = singleLineDepartures.sort();

                // push object with data to timetables
                timetables[singleStopNameFromLocalStorageArray].push({
                    lineNumber: lineNumber,
                    lineName: singleLine.name,
                    direction: singleLine.stops[singleLine.stops.length - 1].name,
                    departures: sortedDepartures

                });
            });
        });
        app.yourStopInfo.main.refresh();
    };

    return {
        prepareTimetables: prepareTimetables,
        timetables: timetables
    }
});