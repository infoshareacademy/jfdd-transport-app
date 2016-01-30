ns('app.yourStopInfo.filtersView', function () {

    function startFilters(filters) {
        $('#filtersDiv')
            .append($('<div class="form-inline">')
                .append($('<div class="form-group">')
                .append($('<div class="input-group">')
                    .append($('<input class="form-control input-sm"> <list="filters">')
                        .append($('<datalist id="filters">')
                            .append(filters.map(
                                function (filter) {
                                    return $('<option>').attr('value', filter.label);
                                }))))))
            .append($('<button class="btn btn-default btn-sm" <button id="clearMyFilter">').text("Wyczyść"))
            .append($(' <button class="btn btn-default btn-sm" <button id="myFilter">').text("Filtruj")


                )
            );


        $('#myFilter').on('click', function () {

            var inputList = $('#filtersDiv input[list="filters"]');

            if ($('#filtersDiv input').val() == filters[1].label) {
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