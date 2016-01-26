ns('app.yourStopInfo.filters', function ()  {

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
            } else {
                console.log ('filtr litera')
            }
            inputList.val('');
        });
    }
    var stopsArray = app.pickYourStops.model.user.favouriteStops();

    function filterOne() {
        var filteredOutStops = stopsArray.filter(function (stopName) {
            return stopName.length >= 9;
        });

        return filteredOutStops;
    }

    return {
        init: function () {
            startFilters();
            filterData();
            //filterOne();
            //activateFilter()
        },
        filterOne: filterOne,
        startFilters: startFilters
    }

});
