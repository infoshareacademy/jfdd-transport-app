ns('app.yourStopInfo.main', function () {
    var toHHMMSS = function (seconds_parameter) {
        var sec_num = parseInt(seconds_parameter, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        var time    = hours+':'+minutes+':'+seconds;
        return time;
    };
    function showDiv() {
        var $jsyourStopInfo = $('#js-yourStopInfo');
        var stopsFromLocalStorageArray = app.pickYourStops.model.user.favouriteStops();


        app.dataManager.fetch('https://isa-api.herokuapp.com/transport/lines.json', [
            function (jsonWithPublicTransportLines) {
                // iterate over stopsFromLocalStorageArray
                stopsFromLocalStorageArray.forEach(function (singleStopFromLocalStorageArray) {
                    // setting up DOM elemets
                    var $singleStopTable = $('<table class="yourStop table">');
                    //var $yourStopName = $('<h3>').text(yourStop);
                    var $rows = $('<tr>');
                    var $cells = $('<td>');

                    // getting jsonWithPublicTransportLines containig given stop
                    // get all jsonWithPublicTransportLines array and filter
                    var linesContainingStopFromLocalStorageArray = jsonWithPublicTransportLines.filter(function (singlePublicTransportLine) {
                        return singlePublicTransportLine.stops.find(function (publicTransportStop) {
                                // compare stop form array to stop name from json, return boolean
                                return publicTransportStop.name === singleStopFromLocalStorageArray;
                            }) !== undefined; // why check against undefined?
                    });
                    console.log(linesContainingStopFromLocalStorageArray.length);

                    // godziny dla linii
                    // iterating over jsonWithPublicTransportLines containing given stop
                    // and calculating departures
                    linesContainingStopFromLocalStorageArray.forEach(function (singleLine) {
                        //var lineRow = $rows.append(line.id);
                        var lineRow = $('<td>').append(singleLine.id);
                        var stop = singleLine.stops.find(function (stop) {
                            return stop.name === singleStopFromLocalStorageArray;
                        });
                        var stopId = singleLine.stops.indexOf(stop);
                        console.log(stopId);
                        var time = singleLine.dTimes.slice(0, stopId).reduce(function (a, b) { return a + b; }, 0);
                        console.log(time);
                        singleLine.departures.forEach(function(sigleDepartureTime) {
                            var depTimeHHMMSS = sigleDepartureTime.hour + ":" + sigleDepartureTime.minutes +":"+sigleDepartureTime.seconds;
                            var depTimesInSeconds = sigleDepartureTime.hour*3600 + sigleDepartureTime.minutes*60 + sigleDepartureTime.seconds;
                            var depTimeOnCurrentStop = (depTimesInSeconds + time)%86400; //?
                            var depTimeOnCurrentStopHHMMSS = toHHMMSS(depTimeOnCurrentStop);
                            lineRow.append("/ " + depTimeOnCurrentStopHHMMSS);
                        });
                        $rows.append(lineRow);
                    });

                    //var lineIDwithDepartures = jsonWithPublicTransportLines[line.id];

                    //$yourStopContainer.append($yourStopName).append($rows);
                    $singleStopTable.append($rows);

                    $jsyourStopInfo.append($singleStopTable);
                    //$jsyourStopInfo.append(
                    //    '<div class="yourStop"><h3>' + yourStop + '<p class = "fetchingStatus"></p></h3></div>'
                    //);
                });
            }
        ]);


    }

    return {
        init: function () {
            showDiv();
        }
    }

});