ns('app.yourStopInfo.main', function () {

    function showDiv(favStops, timetables, currentFilter) {

        var $favStopsContainer = $('#js-yourStopInfo');

        $favStopsContainer.empty();

        favStops.filter(currentFilter || function ()
            { return true; }).forEach(function (stopName) {
                var $stopContainer = $('<div class="yourStop wrapper col-sm-8 col-sm-offset-2">');
                var $stopNameContainer = $('<h3 class="wrapper">').append(stopName);
                var $stopTimetableContainer = $('<div class="stopTimetable wrapper">');

                $favStopsContainer
                    .append($stopContainer
                        .append($stopNameContainer)
                        .append($stopTimetableContainer)

                    );

            var $btn = $('<button type="button" class="btn btn-xs btn-circle btn-danger removeStopBtn">x</button>');
            $stopNameContainer.append($btn);
            $btn.click(function () {
                app.pickYourStops.model.user.removeFromFavouriteStops(stopName);
                app.yourStopInfo.main.refresh();
            });

                var currentStopLines = timetables[stopName];
                var $tableTimeTables = $('<table class="table table-striped">');
                var $tHeadCell = $('<th>').text("Linia");
                var $tHeadCell2 = $('<th>').text("Rozkład jazdy");
                var $tHeadRow = $('<tr>');

                var $thead = $('<thead>').append($tHeadRow.append($tHeadCell).append($tHeadCell2));
                var $tbody = $('<tbody>');
                if (currentStopLines !== undefined) {
                    currentStopLines.forEach(function (line) {

                        var $lineCell = $('<td>');
                        var $lineButton = $('<button class="btn btn-success">');
                        $lineButton.text(line.lineName);
                        $lineCell.append($lineButton);

                        var $departureCell = $('<td>');
                        line.departures.forEach(function (departure) {
                            var $button = $('<button class="btn btn-primary">').text(departure);
                            $departureCell.append($button);
                        });

                        var $linesRow = $('<tr>');

                        $linesRow.append($lineCell).append($departureCell);
                        $tbody.append($linesRow);

                        $tableTimeTables.append($thead);
                        $tableTimeTables.append($tbody);

                        $stopTimetableContainer.append($tableTimeTables);

                    });
                }
            });
    }

    return {
        init: function () {
           this.refresh();
        },
        refresh: function () {
            var favStops = app.pickYourStops.model.user.favouriteStops();
            var timetables = app.yourStopInfo.timetable.timetables;
            var currentFilter = app.yourStopInfo.filters.currentFilter;
            showDiv(favStops, timetables, currentFilter);
        }
    }

});