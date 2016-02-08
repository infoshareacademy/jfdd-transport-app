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
        if ($('.fetchingStatus').length > 0) {
            $('.fetchingStatus').remove();
        }

        var userLines = filterByLineId(lines, currentLines);
        var results = [];

        userLines.forEach(function (line) {
            var today = new Date();
            var now = Date.now();
            var busDeparture;
            var busReturnToDepot;
            var lineData = {
                lineId: line.id,
                lineName: line.name,
                isInService: false,
                delays: [],
                averageDelay: 0
            };

            line.departures.forEach(function (departure, index) {
                busDeparture = today.setHours(departure.hour, departure.minutes, departure.seconds);

                if (busDeparture < now) {
                    busReturnToDepot = busDeparture + (line.dTimes.reduce(function (a, b) {
                            return a + b;
                        }) * 1000 * 2) + Math.floor(line.latencies[index] * 1000);
                    if (busReturnToDepot > now) {
                        lineData.isInService = true;
                        lineData.delays.push(Math.max(0, Math.floor(line.latencies[index])));
                    }
                }

            });

            if(lineData.delays.length > 0) {
                var totalDelays = lineData.delays.reduce(function (a, b) {
                    return a + b;
                });

                lineData.averageDelay = Math.floor(totalDelays / lineData.delays.length);
            }

            if (!lineData.isInService) {
                lineData.averageDelay = -1; //For easier sorting. Lines that aren't in service need to be last in sorted results.
            }

            results.push(lineData);
        });

        var sortedDelayedLines = sortLineDelays(results);
        var linesToDisplay = getHhMmSs(sortedDelayedLines);

        app.lineStats.view.displaySortedBuses(linesToDisplay);
    };

    var sortLineDelays = function (data) {
        return data.sort(function (a, b) {
            return b.averageDelay - a.averageDelay;
        });
    };

    var getHhMmSs = function (lineArray) {
        lineArray.map(function (line) {
            if (line.averageDelay === -1) {
                line.delayToDisplay = ' w tej chwili nie kursuje';
            } else if (line.averageDelay === 0) {
                line.delayToDisplay = ' odjeżdża o czasie';
            } else {
                var totalSeconds = line.averageDelay;
                var hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                var minutes = Math.floor(totalSeconds / 60);
                var seconds = totalSeconds % 60;

                line.delayToDisplay = ' ma opóźnienie ';

                if (hours !== 0) {
                    line.delayToDisplay += hours + ' godz. ';
                }

                if (minutes !== 0) {
                    line.delayToDisplay += minutes + ' min ';
                }

                if (seconds !== 0) {
                    line.delayToDisplay += seconds + ' sek. ';
                }
            }
        });

        return lineArray;
    };

    return {
        init: function () {
            var apiUrl = 'https://isa-api.herokuapp.com/transport/lines.json';
            currentLines = [];

            app.lineStats.view.init(apiUrl);

            $('input[list="lines"]').on('focus', function () {
                if ($('.lineErrorMessage').length > 0) {
                    $('.lineErrorMessage').remove();
                }
            });

            $('#chooseLines').on('click', function () {
                if ($('.lineErrorMessage').length > 0) {
                    $('.lineErrorMessage').remove();
                }

                var lineList = $('input[list="lines"]');

                var inputContainsValueFromDatalist = false;
                $('datalist#lines > option').each(function () {
                    if ($(this).attr('value') === lineList.val()) {
                        inputContainsValueFromDatalist = true;
                    }
                });

                var valueAlreadyPicked = false;
                $('#selectedLines li').each(function () {
                    if ($(this).text() === lineList.val()) {
                        valueAlreadyPicked = true;
                    }
                });

                if (inputContainsValueFromDatalist && !valueAlreadyPicked) {
                    $('#selectedLines').append('<li>' + lineList.val() + '</li>');

                    currentLines.push(lineList.val());

                    if ($('#showStats').length < 1) {
                        $('#js-lineStats > div')
                            .append($('<button id="showStats" type="button" class="btn btn-default">' + 'Pokaż opóźnienia' + '</button>'));
                    }

                    if ($('#resetStats').length < 1) {
                        $('#js-lineStats > div')
                            .append(' ')
                            .append($('<button id="resetStats" type="button" class="btn btn-default">' + 'Wyczyść' + '</button>'));
                    }
                } else {
                    var $errorMessage = ($('<span class="lineErrorMessage">'));

                    if (valueAlreadyPicked) {
                        $errorMessage.text('Ta linia została już wybrana.');
                    } else {
                        $errorMessage.text('Wybierz jedną z dostępnych linii.');
                    }

                    $('.js-lineInputContainer').after($errorMessage);
                }
                lineList.val('');


            });

            $('#js-lineStats').on('click', '#showStats', function () {
                var $fetchingStatus = $('<p>');
                $fetchingStatus.addClass('fetchingStatus voffset');
                $fetchingStatus.text('Pobieram dane...');
                $('#resetStats').after($fetchingStatus);

                if ($('.lineErrorMessage').length > 0) {
                    $('.lineErrorMessage').remove();
                }

                $('.sortedLines').empty();
                app.dataManager.fetch(apiUrl, [getLineDelays]);
            });

            $('#js-lineStats').on('click', '#resetStats', function () {
                $('#showStats').remove();
                $('#selectedLines').empty();
                $('.sortedLines').remove();
                $('#resetStats').remove();

                if ($('.lineErrorMessage').length > 0) {
                    $('.lineErrorMessage').remove();
                }

                currentLines = [];
            });
        }
    };
});