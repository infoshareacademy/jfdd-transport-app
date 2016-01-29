ns('app.yourStopInfo.filters', function () {

    var linesArray;
    var filtersArray = ["Przystanki, na których jeździ więcej niż 3 linie", "Przystanki, na które wjedzie autobus w przeciągu 5 minut"];
    //var inputList = $('#js-yourStopInfo input[list=filters]');
    var filteredLines;



//Filter Departure time <5 minutes:----------------------------------------
    function filterOne(stopName) {


        var actualTime = new Date();
        var hours = actualTime.getHours();
        var minutes = actualTime.getMinutes();
        var seconds = actualTime.getSeconds();

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var actualHour = hours + ':' + minutes + ':' + seconds;

        console.log(actualHour);
        return actualHour;



        var departureTimes = app.yourStopInfo.timetable.timetables;
        console.log(departureTimes);

        console.log(actualHour);
        var $departuresTextValue = departureTimes.text();

        console.log($departuresTextValue);
        var departureValuesSplit = $departuresTextValue.split(" ");
        console.log(departureValuesSplit);

        var fixDepartureValuesSplit = [];
        for(var i=1; i<departureValuesSplit.length; i=i+2){
            fixDepartureValuesSplit.push(departureValuesSplit[i]);
        }


        console.log(fixDepartureValuesSplit);

       var hourToSeconds = actualHour.split(':');
         var actualSeconds = (+hourToSeconds[0]) * 60 * 60 + (+hourToSeconds[1]) * 60 + (+hourToSeconds[2])

        fixDepartureValuesSplit.forEach(function (time) {
            var linesHourToSeconds = time.split(':');
            var linesTimeInSeconds = (+linesHourToSeconds[0]) * 60 * 60 + (+linesHourToSeconds[1]) * 60 + (+linesHourToSeconds[2])
            var wynik = actualSeconds - linesTimeInSeconds;
            return wynik;
            console.log(wynik);


            });
    }


//Filter "minimum thee lines":
    function filterTwo(stopName) {

        var favStops = app.pickYourStops.model.user.favouriteStops();
        //filtruje dane o liniach z jsona, wyszukując te, które poruszają się po jednym z ulubionych przystanków
        //zwraca tablicę z obiektami (z jsona - linie)

        filteredLines = linesArray.filter(function (line) {
            return line.stops.find(function (stop) {
                    return favStops.indexOf(stop.name) !== -1;
                }) !== undefined;
        });
        console.log(filteredLines);

        var accumulator = {};
        //TO CHECK
        favStops.forEach(function (name) {
            accumulator[name] = [];
        });

        filteredLines.forEach(function (line) {
            line.stops.forEach(function (stop) {
                if (accumulator[stop.name] !== undefined) {
                    accumulator[stop.name].push(line);
                }
            });
        });
        console.log(accumulator);

// parse object to array and filter it:
        var accumulatorArray = $.map(accumulator, function (value, key) {
            return {
                stopName: key,
                numberOfLines: value.length
            };
        }).filter(function (item) {
            return item.numberOfLines >= 3;
        });
        //console.log(accumulatorArray);

//Adds filtering result to yourStopInfo div (first it cleares it)
        var $emptyYourStopDiv = $('#js-yourStopInfo').empty();
        if (accumulatorArray.length !== 0) {
            accumulatorArray.forEach(function (stop) {

                $emptyYourStopDiv.append('<div class="yourStop"><h3>' + stop.stopName + '</h3></div>')
                    .append('<div class="yourStop"><p>' + 'Liczba dostępnych linii: ' + stop.numberOfLines + '</p></div>')
            });
        }
        else {
            $emptyYourStopDiv.append('<div class="yourStop"><p>Niestety, żaden z Twoich ulubionych przystanków nie spełnia kryteriów wyszukiwania!</p></div>')
        }
    }

    function dummyFilter(stopName, index) {
        console.log(stopName);
        return index === 0;
    }

    return {
        init: function (lines) {
            linesArray = lines;
            app.yourStopInfo.filtersView.init();
        },
        availableFilters: [
            {
                label: "Przystanki, na których jeździ więcej niż 3 linie",
                filter: filterOne
            },
            {
                label: "Przystanki, na które wjedzie autobus w przeciągu 5 minut",
                filter: filterTwo
            },
            {
                label: "Dummy",
                filter: dummyFilter
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
