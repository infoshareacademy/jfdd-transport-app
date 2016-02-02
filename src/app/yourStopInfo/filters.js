ns('app.yourStopInfo.filters', function () {

    var linesArray;
    var filtersArray = ["Przystanki, na których jeżdżą więcej niż 3 linie", "Przystanki, na które wjedzie autobus w ciągu 15 minut"];
    var filteredLines;



//Filter Departure time <15 minutes:----------------------------------------
    function filterOne(stopName) {

        var actualTime = new Date();
        var hours = actualTime.getHours() * 3600;
        var minutes = actualTime.getMinutes() * 60;
        var secs = actualTime.getSeconds();

        var seconds = hours + minutes + secs;
        var departureTimes = app.yourStopInfo.timetable.timetables;
        console.log(departureTimes)
        return departureTimes[stopName].reduce(function (prev, curr) {
            return prev || curr.departures.reduce(function (prev, curr) {
                    var toSeconds = curr.split(":");
                    var pure = (+toSeconds[0]) * 60 * 60 + (+toSeconds[1]) * 60;

                    var dTime = pure - seconds;
                    return prev || (dTime <= 900 && dTime >= 0);
                }, false);
        }, false);
    }


//Filter "minimum thee lines"------------------------------------------:
    function filterTwo(stopName) {

        filteredLines = linesArray.filter(function (line) {
            return line.stops.find(function (stop) {
                    return stop.name === stopName;
                }) !== undefined;
        });

        var accumulator = [];

        filteredLines.forEach(function (line) {
            line.stops.forEach(function (stop) {
                if (stop.name === stopName) {
                    accumulator.push(line);
                }
            });
        });

        if (accumulator.length >= 4) {
            return true;
        }
    }


    return {
        init: function (lines) {
            linesArray = lines;
            app.yourStopInfo.filtersView.init();
        },
        availableFilters: [
            {
                label: "Przystanki, na które wjedzie autobus w ciągu 15 minut",
                filter: filterOne
            },
            {
                label: "Przystanki, na których jeżdżą więcej niż 3 linie",
                filter: filterTwo
            }
        ],
        currentFilter: null,
        clearFilters: function () {
            this.currentFilter = null;
            app.yourStopInfo.main.refresh();
        },
        setFilter: function (filter) {
            this.currentFilter = filter;
            app.yourStopInfo.main.refresh();
        }
    }

});
