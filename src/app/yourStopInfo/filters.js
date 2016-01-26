ns('app.yourStopInfo.filters', function ()  {

    var linesArray;
    var filtersArray = ["Przystanki, na których jeździ więcej niż 1 linia", "Przystanki, których nazwa jest dłuższa niż 9 znaków"];
    //var inputList = $('#js-yourStopInfo input[list=filters]');


    function fetchRealData() {

        app.dataManager.fetch('https://isa-api.herokuapp.com/transport/lines.json', [function (lines) {
            console.log(lines);
            linesArray = lines;
        }]);
    }

    function startFilters() {

        function addSelect(filters) {

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
        $('#myFilter').on('click', function () {

            if ($('#js-yourStopInfo input').val() == filtersArray[1]) {
                app.yourStopInfo.main.filterOneDiv();

            }

            else if ($('#js-yourStopInfo input').val() == filtersArray[0]){
                app.yourStopInfo.main.filterTwoDiv();
                console.log('filtr litera')
            }
        });
        //inputList.val('');
    }

    function filterOne() {
        var favStops = app.pickYourStops.model.user.favouriteStops();

        var filteredOutStops = favStops.filter(function (stop) {
            return stop.length >= 9;
        });
        return filteredOutStops;
    }

    function filterTwo() {

        var favStops = app.pickYourStops.model.user.favouriteStops();
        var filteredLines = linesArray.filter(function (line) {
            return line.stops.find(function (stop) {
                    return favStops.indexOf(stop.name) !== -1;
                }) !== undefined;
        });


        var accumulator = {};

        favStops.forEach(function (name) {
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
