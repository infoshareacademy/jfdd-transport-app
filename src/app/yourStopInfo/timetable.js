ns('app.yourStopInfo.timetable', function () {

    var timetables = {};

    var toHHMMSS = function (seconds_parameter) {
        var sec_num = parseInt(seconds_parameter, 10);  // don't forget the radix in the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    };

    var wpFunction = function (jsonWithPublicTransportLines) {
        var stopsFromLocalStorageArray = app.pickYourStops.model.user.favouriteStops();
        stopsFromLocalStorageArray.forEach(function (singleStopNameFromLocalStorageArray) {

            timetables[singleStopNameFromLocalStorageArray] = timetables[singleStopNameFromLocalStorageArray] || [];

            var linesContainingStopFromLocalStorageArray = jsonWithPublicTransportLines.filter(function (singlePublicTransportLine) {
                return singlePublicTransportLine.stops.find(function (publicTransportStop) {
                        return publicTransportStop.name === singleStopNameFromLocalStorageArray;
                    }) !== undefined;
            });

            linesContainingStopFromLocalStorageArray.forEach(function (singleLine) {
                var lineNumber = singleLine.id;

                var matchingStopFromJsonAgainstLocalstorage = singleLine.stops.find(function (singleStop) {
                    return singleStop.name === singleStopNameFromLocalStorageArray;
                });
                var matchingStopArrayIndex = singleLine.stops.indexOf(matchingStopFromJsonAgainstLocalstorage);

                var time = singleLine.dTimes.slice(0, matchingStopArrayIndex + 1).reduce(function (a, b) {
                    return a + b;
                }, 0);

                var singleLineDepartures = singleLine.departures.map(function (sigleDepartureTime) {
                    var depTimesInSeconds = sigleDepartureTime.hour * 3600 + sigleDepartureTime.minutes * 60 + sigleDepartureTime.seconds;
                    var depTimeOnCurrentStop = (depTimesInSeconds + time) % 86400;
                    var depTimeOnCurrentStopHHMMSS = toHHMMSS(depTimeOnCurrentStop);
                    return depTimeOnCurrentStopHHMMSS;
                });

                timetables[singleStopNameFromLocalStorageArray].push({
                    lineNumber: lineNumber,
                    lineName: singleLine.name,
                    departures: singleLineDepartures

                });
            });
        });
        app.yourStopInfo.main.refresh();
    };

    return {
        wpFunction: wpFunction,
        timetables: timetables
    }
});