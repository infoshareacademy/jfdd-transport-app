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

            if (currentStopLines !== undefined) {
                currentStopLines.forEach(function (line) {
                    var $lineContainer = $('<div>').append(line.lineNumber);
                    $stopTimetableContainer.append($lineContainer);

                    line.departures.forEach(function (departure) {
                        $lineContainer.append($('<span>').append(departure));
                    })
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