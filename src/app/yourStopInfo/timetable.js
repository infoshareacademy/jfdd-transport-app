ns('app.yourStopInfo.timetable', function () {

    var timetables = {};

    var toHHMMSS = function (seconds_parameter) {
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
    var cachedJson = null;
    var prepareTimetables = function (jsonWithPublicTransportLines) {
        for (var i in timetables) {
            delete timetables[i];
        }
        if (jsonWithPublicTransportLines === undefined) {
            jsonWithPublicTransportLines = cachedJson;
        } else {
            cachedJson = jsonWithPublicTransportLines;
        }
        // get stop names from local storage for user
        var stopsFromLocalStorageArray = app.pickYourStops.model.user.favouriteStops();

        // for each of the stop name iterate
        stopsFromLocalStorageArray.forEach(function (singleStopNameFromLocalStorageArray) {

            timetables[singleStopNameFromLocalStorageArray] = timetables[singleStopNameFromLocalStorageArray] || [];

            // return true if stop name from json equals stop from local storage
            var isStopFromJsonEqualToStopFromLocalStorage = function (publicTransportStop) {
                return publicTransportStop.name === singleStopNameFromLocalStorageArray;
            };

            // return object that satisfies find condition
            var getStopEqualToStopFromLocalStorage = function (singlePublicTransportLine) {
                return singlePublicTransportLine.stops.find(isStopFromJsonEqualToStopFromLocalStorage);
            }

            // from all the lines from json, get only those who stop at a stop saved in local storage
            // return new array
            var linesContainingStopFromLocalStorageArray = jsonWithPublicTransportLines.filter(getStopEqualToStopFromLocalStorage);

            // for each line that stops at a user stop
            linesContainingStopFromLocalStorageArray.forEach(function (singleLine) {
                var lineNumber = singleLine.id;

                // get single matching stop, name and id of the stop from json
                var matchingStopFromJsonAgainstLocalStorage = singleLine.stops.find(isStopFromJsonEqualToStopFromLocalStorage);

                // get the index of the stop from json to know how long to add times of journey
                var matchingStopArrayIndex = singleLine.stops.indexOf(matchingStopFromJsonAgainstLocalStorage);


                // get the time in second from starting stop to given stop
                var time = singleLine.dTimes.slice(0, matchingStopArrayIndex + 1).reduce(function (a, b) {
                    return a + b;
                }, 0);

                // return departures for single stop
                var singleLineDepartures = singleLine.departures.map(function (sigleDepartureTime) {
                    var depTimesInSeconds = sigleDepartureTime.hour * 3600 + sigleDepartureTime.minutes * 60 + sigleDepartureTime.seconds;
                    var depTimeOnCurrentStop = (depTimesInSeconds + time) % 86400;
                    var depTimeOnCurrentStopHHMMSS = toHHMMSS(depTimeOnCurrentStop);
                    return depTimeOnCurrentStopHHMMSS;
                });

                var sortedDepartures = singleLineDepartures.sort();

                // push object with data to timetables
                timetables[singleStopNameFromLocalStorageArray].push({
                    lineNumber: lineNumber,
                    lineName: singleLine.name,
                    direction: singleLine.stops[singleLine.stops.length-1].name,
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