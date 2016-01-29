ns('app.yourStopInfo.filtersView', function () {

    function startFilters(filters) {
        $('#filtersDiv')
            .prepend($('<button id="clearMyFilter">').text("Wyczyść"))
            .prepend($('<button id="myFilter">').text("Filtruj"))
            .prepend($('<input list="filters">').append($('<datalist id="filters">')
                .append(filters.map(
                    function (filter) {
                        return $('<option>').attr('value', filter.label);
                    })
                ))
            );

        $('#myFilter').on('click', function () {

            var inputList = $('#filtersDiv input[list="filters"]');

            if ($('#filtersDiv input').val() == filters[2].label) {
                app.yourStopInfo.filters.setFilter(filters[2].filter);

                inputList.val('');

            }

            else if ($('#filtersDiv input').val() == filters[1].label) {
                app.yourStopInfo.filters.setFilter(filters[1].filter);

                inputList.val('');

            }

            else if ($('#filtersDiv input').val() == filters[0].label) {
                app.yourStopInfo.filters.setFilter(filters[0].filter)
                inputList.val('');
            }
        });

        $('#clearMyFilter').on('click', function () {
            app.yourStopInfo.filters.clearFilters();
        });
    }

   return {
       init: function () {
           var availableFilters = app.yourStopInfo.filters.availableFilters;
           startFilters(availableFilters);
       }
   }
});