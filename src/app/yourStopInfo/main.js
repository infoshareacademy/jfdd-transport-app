ns('app.yourStopInfo.main', function () {



    function showDiv(favStops, timetables) {

        var $favStopsContainer = $('#js-yourStopInfo');

        $favStopsContainer.empty();

        favStops.forEach(function (stopName) {
            var $stopContainer = $('<div class="yourStop">');
            var $stopNameContainer = $('<h3>').append(stopName);
            var $stopTimetableContainer = $('<div class="stopTimetable">');

            $favStopsContainer.append(
                $stopContainer
                    .append($stopNameContainer)
                    .append($stopTimetableContainer)
            );


                console.log(timetables);

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

    function filterOneDiv() {

        var filteredOutStops = app.yourStopInfo.filters.filterOne();
        showDiv(filteredOutStops);
        //app.yourStopInfo.filters.startFilters();
        //app.yourStopInfo.filters.filterData();
    }

    function filterTwoDiv() {
    }


    return {
        init: function () {
           this.refresh();
        },
        refresh: function () {
            var favStops = app.pickYourStops.model.user.favouriteStops();
            var timetables = app.yourStopInfo.timetable.timetables;
            showDiv(favStops, timetables);
        },
        filterOneDiv: filterOneDiv,
        showDiv:showDiv,
        filterTwoDiv: filterTwoDiv

    }

});