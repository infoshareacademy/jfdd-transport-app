ns('app.yourStopInfo.filters', function () {

    var linesArray;
    var filtersArray = ["Przystanki, na których jeździ więcej niż 3 linie", "Przystanki, na które wjedzie autobus w przeciągu X minut"];
    //var inputList = $('#js-yourStopInfo input[list=filters]');
    var filteredLines;



//Filter Departure time <5 minutes:----------------------------------------
    function filterOne(stopName) {

        var actualTime = new Date();
        var hours = actualTime.getHours() * 3600;
        var minutes = actualTime.getMinutes() * 60;
        var secs = actualTime.getSeconds();

        var seconds = hours + minutes + secs;
        //console.log('test');

        var departureTimes = app.yourStopInfo.timetable.timetables;
        //console.log(departureTimes[stopName]);

        departureTimes[stopName].forEach(function (stopName) {
            stopName.departures.forEach(function (departures) {
                //console.log(departures.pure-seconds);

                if (departures.pure-seconds <= 1000) {
                    //return true;
                console.log('true')
                }
                //else {
                //console.log('false')
                //    return false;
                //}
            })
        });
    }


//Filter "minimum thee lines":
    function filterTwo(stopName) {

        //filtruje dane o liniach z jsona, wyszukując te, które poruszają się po jednym z ulubionych przystanków
        //zwraca tablicę z obiektami (z jsona - linie)

        filteredLines = linesArray.filter(function (line) {
            return line.stops.find(function (stop) {
                    return stop.name === stopName;
                }) !== undefined;
        });

        var accumulator = [];
console.log(filteredLines);

        filteredLines.forEach(function (line) {
            line.stops.forEach(function (stop) {
                if (stop.name === stopName) {
                    accumulator.push(line);
                }
            });
        });

        if (accumulator.length >= 3) {
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
                label: "Przystanki, na które wjedzie autobus w przeciągu 5 minut",
                filter: filterOne
            },
            {
                label: "Przystanki, na których jeżdżą minimum 3 linie",
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
