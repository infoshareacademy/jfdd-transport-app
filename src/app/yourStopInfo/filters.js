ns('app.yourStopInfo.filters', function ()  {

    var stopsArray;
    var linesArray;

    function fetchRealData() {
    //    app.dataManager.fetch('https://isa-api.herokuapp.com/transport/stops.json', [function (stops) {
    //       console.log(stops);
    //        stopsArray = stops;
    //    }]);

        app.dataManager.fetch('https://isa-api.herokuapp.com/transport/lines.json', [function (lines) {
            console.log(lines);
            linesArray = lines;
        }]);
    }

    function startFilters() {

        function addSelect(filters) {
            var filtersArray = ["Przystanki, których nazwa zaczyna się na M", "Przystanki, których nazwa jest krótsza niż 5 znaków"];
            $('#js-yourStopInfo')
                .prepend($('<button id="myFilter">').text("Filtruj")).append($('<div class="selectedFilter">'))
                .prepend($('<input list="filters">').append($('<datalist id="filters">')
                    .prepend(
                        filtersArray.map(
                            function (filtersArray) {
                                return $('<option>').attr('value', filtersArray);
                            })
                    ))
                )
        }

        addSelect();
    }

    function filterData() {
        var filtersArray = ["Przystanki, których nazwa zaczyna się na M", "Przystanki, których nazwa jest krótsza niż 5 znaków"];
        $('#myFilter').on('click', function () {

            var inputList = $('#js-yourStopInfo input[list=filters]');

            if ($('#js-yourStopInfo input').val() == filtersArray[1]) {
                //filterOne();
                app.yourStopInfo.main.filterDivs();
                //filterTwo();
            } else {
                console.log ('filtr litera')
            }
            inputList.val('');
        });
    }

    function filterOne() {
        var favStops = app.pickYourStops.model.user.favouriteStops();

        var filteredOutStops = favStops.filter(function (stop) {
            return stop.length >= 9;
        });
        return filteredOutStops;
    }

    function filterTwo() {
        debugger;
        var stopNames = app.pickYourStops.model.user.favouriteStops();
        var filteredLines = linesArray.filter(function(line){
            return line.stops.find(function (stop) {
                    debugger;
               return stopNames.indexOf(stop.name) !== -1;
            }) !== undefined;
        });

        debugger;

        var accumulator = {};

        stopNames.forEach(function (name) {
           accumulator[name] = [];
        });

        filteredLines.forEach(function (line) {
           line.stops.forEach(function (stop) {
               debugger;
               if (accumulator[stop.name] !== undefined) {
                   accumulator[stop.name].push(line);
               }
           });
        });

        console.log(accumulator);

        //var filteredOutStops = stopsArray.filter(function (stop) {
        //    return stop.name.length >= 9;
        //});
//}
//
//        return filteredOutStops;
    }
    return {
        init: function () {
            startFilters();
            filterData();
            fetchRealData();
            //filterOne();
            //activateFilter()
        },
        filterOne: filterOne,
        startFilters: startFilters,
        filterData: filterData
    }

});
