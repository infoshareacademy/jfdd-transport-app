/**
 * Created by agmo on 22.01.16.
 */
ns('app.lineStats.main', function () {
    var currentLines;

    var filterByLineId = function (arrayToFilter, arrayToFilterAgainst) {
        return arrayToFilter.filter(function (line) {
            return arrayToFilterAgainst.indexOf('' + line.name) !== -1;
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
                lineData.delay = -1; //For easier sorting. Lines that aren't in service need to be last in sorted results.
            }

            results.push(lineData);
            console.log(results);
            //return results;
        });
        var sortedDelayedLines = sortLineDelays(results);
        console.log(sortedDelayedLines);
        var linesToDisplay = getHhMmSs(sortedDelayedLines);

        app.lineStats.view.displaySortedBuses(linesToDisplay);
    };

    var sortLineDelays = function (data) {
        return data.sort(function (a, b) {
            return b.delay - a.delay;
        });
    };

    var getHhMmSs = function (lineArray) {
        var temp= lineArray.map(function (line) {
            console.log(line);
            if (line.delay === -1) {
                line.delayToDisplay = ' w tej chwili nie kursuje';
            } else if (line.delay === 0) {
                line.delayToDisplay = ' odjeżdża o czasie';
            } else {
                var totalSeconds = line.delay;
                var hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                var minutes = Math.floor(totalSeconds / 60);
                var seconds = totalSeconds % 60;

                if (hours === 0 && minutes === 0) {
                    line.delayToDisplay = ' ma opóźnienie ' + seconds + ' sek.';
                } else if (hours === 0 && minutes !== 0 && seconds !== 0) {
                    line.delayToDisplay = ' ma opóźnienie ' + minutes + ' min, ' + seconds + ' sek.';
                } else if (hours !== 0 && minutes !== 0 && seconds === 0) {
                    line.delayToDisplay = ' ma opóźnienie ' + minutes + ' min';
                } else if (hours !== 0 && minutes !== 0 && seconds !== 0) {
                    line.delayToDisplay = ' ma opóźnienie ' + hours + ' godz., ' + minutes + ' min, ' + seconds + ' sek.';
                }
            }
        });
        console.log(lineArray);
        return lineArray;
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
                        $('#js-lineStats')
                            .append($('<button id="showStats" type="button" class="btn">' + 'Pokaż opóźnienia' + '</button>'));
                    }

                    if ($('#resetStats').length < 1) {
                        $('#js-lineStats')
                            .append($('<button id="resetStats" type="button" class="btn">' + 'Wyczyść' + '</button>'));
                    }
                }
                lineList.val('');
            });

            $('#js-lineStats').on('click', '#showStats', function () {
                app.dataManager
                    .fetch('https://isa-api.herokuapp.com/transport/lines.json', [getLineDelays]);

                $('#showStats').addClass('btn-disabled').prop('disabled', true);
                $('#chooseLines').addClass('btn-disabled').prop('disabled', true);
            });

            $('#js-lineStats').on('click', '#resetStats', function () {
                $('#showStats').remove();
                $('#chooseLines').removeClass('btn-disabled').prop('disabled', false);
                $('#selectedLines').empty();
                $('.sortedLines').remove();
                $('#resetStats').remove();
                currentLines = [];
            });
        }
    };
});