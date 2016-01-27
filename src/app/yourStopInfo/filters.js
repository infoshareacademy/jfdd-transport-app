ns('app.yourStopInfo.filters', function () {

    var linesArray;
    var filtersArray = ["Przystanki, na których jeździ więcej niż 3 linie", "Przystanki, których nazwa jest dłuższa niż 9 znaków"];
    //var inputList = $('#js-yourStopInfo input[list=filters]');


    function fetchRealData() {

        app.dataManager.fetch('https://isa-api.herokuapp.com/transport/lines.json', [function (lines) {
            console.log(lines);
            linesArray = lines;
        }]);
    }

    function startFilters() {

//Adds drop-down filter list and filter button:
        function addSelect(filters) {

            $('#filtersDiv')
                .prepend($('<button id="clearMyFilter">').text("Wyczyść"))//.append($('<div class="selectedFilter">'))
                .prepend($('<button id="myFilter">').text("Filtruj"))//.append($('<div class="selectedFilter">'))
                .prepend($('<input list="filters">').append($('<datalist id="filters">')
                    .append(filtersArray.map(
                        function (filtersArray) {
                            return $('<option>').attr('value', filtersArray);
                        })
                    ))
                )
        }

        addSelect();
    }

//Adds clean filter button:
    function clearFilterData() {
        $('#clearMyFilter').on('click', function () {
                console.log("usuwam");
                var favStops = app.pickYourStops.model.user.favouriteStops();
                app.yourStopInfo.main.showDiv(favStops);
            }
        )
    }

//Enable appropriate filters on click:
    function filterData() {
        $('#myFilter').on('click', function () {

            if ($('#filtersDiv input').val() == filtersArray[1]) {
                app.yourStopInfo.main.filterOneDiv();
            }

            else if ($('#filtersDiv input').val() == filtersArray[0]) {
                app.yourStopInfo.main.filterTwoDiv();
                filterTwo();
            }
        });
        //inputList.val('');
    }

//Filter "stop name length":
    function filterOne() {
        var favStops = app.pickYourStops.model.user.favouriteStops();

        var filteredOutStops = favStops.filter(function (stop) {
            return stop.length >= 9;
        });
        return filteredOutStops;
    }


//Filter "minimum thee lines":
    function filterTwo() {

        var favStops = app.pickYourStops.model.user.favouriteStops();
        //filtruje dane o liniach z jsona, wyszukując te, które poruszają się po jednym z ulubionych przystanków
        //zwraca tablicę z obiektami (z jsona - linie)
        var filteredLines = linesArray.filter(function (line) {
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
//TO DO - get numbers of filtered out lines
//        var accumulatorArrayTwo = $.map(accumulator, function (value) {
//return {lines: value}
//        }).filter(function (item) {
//            return item.lines.length >= 3;
//        });
//        console.log(accumulatorArrayTwo);
//
//        accumulatorArrayTwo.forEach(function (lines){
//            return lines.map(function(value, key){
//                return {
//                    stopName: key,
//                    numberOfLines: value.length
//                };
//            })
//        })

// parse object to array and filter it:
        var accumulatorArray = $.map(accumulator, function (value, key) {
            return {
                stopName: key,
                numberOfLines: value.length
            };
        }).filter(function (item) {
            return item.numberOfLines >= 3;
        });
        console.log(accumulatorArray);

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


    function clearFilterData() {
        $('#clearMyFilter').on('click', function () {
                console.log("usuwam");
                var favStops = app.pickYourStops.model.user.favouriteStops();
                app.yourStopInfo.main.showDiv(favStops);
            }
        )
    }


    return {
        init: function () {
            startFilters();
            filterData();
            fetchRealData();
            clearFilterData ()
        },
        filterOne: filterOne,
        startFilters: startFilters,
        filterData: filterData
    }

});
