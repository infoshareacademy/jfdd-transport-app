ns('app.yourStopInfo.timetable', function () {



    app.dataManager.fetch('https://isa-api.herokuapp.com/transport/lines.json', [wpFunction]);


    var wpFunction = function (jsonWithPublicTransportLines) {

        stopsFromLocalStorageArray.forEach(function (singleStopNameFromLocalStorageArray) {
            var $singleStopTable = $('<table class="table">');
            var tr = $('<tr>');
            var $tableHeading = $('<th>').append(singleStopNameFromLocalStorageArray);
            $singleStopTable.append(tr.append($tableHeading));

            var linesContainingStopFromLocalStorageArray = jsonWithPublicTransportLines.filter(function (singlePublicTransportLine) {
                return singlePublicTransportLine.stops.find(function (publicTransportStop) {
                        return publicTransportStop.name === singleStopNameFromLocalStorageArray;
                    }) !== undefined; // why check against undefined?
            });
            console.log(linesContainingStopFromLocalStorageArray.length);

            linesContainingStopFromLocalStorageArray.forEach(function (singleLine) {
                var lineNumber = singleLine.id;
                var $lineNumberRow = $('<tr>');
                var $lineNumberCell = $('<td>').append(lineNumber);
                $lineNumberRow.append($lineNumberCell);

                var matchingStopFromJsonAgainstLocalstorage = singleLine.stops.find(function (singleStop) {
                    return singleStop.name === singleStopNameFromLocalStorageArray;
                });
                var matchingStopArrayIndex = singleLine.stops.indexOf(matchingStopFromJsonAgainstLocalstorage);
                console.log(matchingStopArrayIndex);
                var time = singleLine.dTimes.slice(0, matchingStopArrayIndex + 1).reduce(function (a, b) {
                    return a + b;
                }, 0);
                console.log(time);

                var $departuresCell = $('<td id = "departureTimes">');

                var singleLineDepartures = singleLine.departures.forEach(function (sigleDepartureTime) {
                    var depTimesInSeconds = sigleDepartureTime.hour * 3600 + sigleDepartureTime.minutes * 60 + sigleDepartureTime.seconds;
                    var depTimeOnCurrentStop = (depTimesInSeconds + time) % 86400; //?
                    var depTimeOnCurrentStopHHMMSS = toHHMMSS(depTimeOnCurrentStop);
                    $departuresCell.append(" " + depTimeOnCurrentStopHHMMSS + " ");
                });

                $lineNumberRow.append($departuresCell);

                $singleStopTable.append($lineNumberRow);
            });
            $jsyourStopInfo.append($singleStopTable);
        });
    }

    return {
        init: function () {
            wpFunction();
            //var favStops = app.pickYourStops.model.user.favouriteStops();
            //showDiv(favStops);
        },
        wpFunction: wpFunction
    }
});