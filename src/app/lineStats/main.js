/**
 * Created by agmo on 22.01.16.
 */
ns('app.lineStats.main', function () {
    var currentLines;

    var filterByLineId = function (arrayToFilter, arrayToFilterAgainst) {
        return arrayToFilter.filter(function (line) {
            return arrayToFilterAgainst.indexOf('' + line.id) !== -1;
        });
    };

    var getLineDelays = function (lines) {
        var userLines = filterByLineId(lines, currentLines);
        var results = [];
        console.log(userLines);

        userLines.forEach(function (line) {
            var today = new Date();
            var now = Date.now();
            var busDeparture;
            var busReturnToDepot;
            console.log(line);
            console.log(line.id);

            var lineData = {
                lineId: line.id,
                lineName: line.name,
                isInService: false,
                delay: 0
            };

            console.log(lineData);

            line.departures.forEach(function (departure, index) {
                console.log(departure);

                busDeparture = today.setHours(departure.hour, departure.minutes, departure.seconds);
                console.log(busDeparture);

                if (busDeparture < now) {
                    busReturnToDepot = busDeparture + (line.dTimes.reduce(function (a, b) {
                            return a + b;
                        }) * 1000 * 2) + Math.floor(line.latencies[index] * 1000);
                    if (busReturnToDepot > now) {
                        lineData.isInService = true;
                        lineData.delay = Math.max(lineData.delay, Math.floor(line.latencies[index]));
                    }
                }

            });

            if (!lineData.isInService) {
                lineData.delay = -1;
            }

            results.push(lineData);
            console.log(results);
            //return results;
        });
        var sortedDelayedLines = sortLineDelays(results);
        console.log('sortedDelayedLines' + sortedDelayedLines);
    };

    var sortLineDelays = function (data) {
        var sortedData = data.sort(function (a, b) {
            return b.delay - a.delay;
        });

        return sortedData;
    };

    return {
        init: function () {
            currentLines = [];

            app.lineStats.view.init();

            $('#chooseLines').on('click', function () {
                var lineList = $('input[list="lines"]');
                if (lineList.val()) {
                    $('#selectedLines').append('<div>' + lineList.val() + '</div>');

                    currentLines.push(lineList.val());

                    if ($('#showStats').length < 1) {
                        $('#js-lineStats').append($('<button id="showStats" type="button">' + 'Wyświetl statystyki' + '</button>'));
                    }
                }
                lineList.val('');
            });

            $('#js-lineStats').on('click', '#showStats', function () {
                app.dataManager
                    .fetch('https://isa-api.herokuapp.com/transport/lines.json', [getLineDelays]);
            });
        }
    };
});