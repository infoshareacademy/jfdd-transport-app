/**
 * Created by agmo on 22.01.16.
 */
ns('app.lineStats.main', function () {
    var currentLines;

    var filterLines = function (linesToFilter) {
        return linesToFilter.filter(function (line) {
            return currentLines.indexOf('' + line.id) !== -1;
        });
    };

    var calculateDelay = function (lines) {
        var userLines = filterLines(lines);
        var results = [];
        console.log(userLines);


        userLines.forEach(function (line) {
            var today = new Date();
            var now = Date.now();
            var busDeparture;
            var busReturnToDepot;
            console.log(line);
            console.log(line.id);

            line.departures.forEach(function (departure, index) {
                console.log(departure);

                busDeparture = today.setHours(departure.hour, departure.minutes, departure.seconds);
                console.log(busDeparture);

                if (busDeparture > now) {
                    console.log('This bus is now in service');
                    results.push({lineid: line.id, busDeparture: busDeparture, busDelay: 0});
                } else {
                    busReturnToDepot = busDeparture + line.dTimes.reduce(function (a, b) {
                            return a + b;
                        }) + line.latencies[index];
                    if (busReturnToDepot > now) {
                        results.push({lineid: line.id, busDeparture: busDeparture, busDelay: line.latencies[index]});
                    }
                }
            });

        });
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
                app.dataManager.fetch('https://isa-api.herokuapp.com/transport/lines.json', [calculateDelay]);
            });
        }
    };
});