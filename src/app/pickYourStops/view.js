//dodawanie nazw przystanków do listy, wyświetlanie oraz usuwanie wybranych przystanków
ns('app.pickYourStops.view', function () {
    return {
        init: function (busStops) {
            $('#js-pickYourStops')
                .append($('<input list="stops">').append($('<datalist id="stops">')
                    .append(
                        busStops.map(
                            function (busStop) {
                                return $('<option>').attr('value', busStop.name);
                            }
                        )
                    ))
                )
                .append($('<button type="button" id="pickStop">').text("Wybierz"));

            $('#pickStop').on('click', function () {
                    var inputList = $('#js-pickYourStops input[list="stops"]');
                    var selectedBusStop = inputList.val();
                    if (selectedBusStop) {

                        app.pickYourStops.model.user.addToFavouriteStops(selectedBusStop);
                        app.yourStopInfo.main.showDiv(app.pickYourStops.model.user.favouriteStops());
                        app.yourStopInfo.filters.startFilters();
                        app.yourStopInfo.filters.filterData();
                        inputList.val('');
                    }
                }
            );

            app.yourStopInfo.main.showDiv(app.pickYourStops.model.user.favouriteStops());
            app.yourStopInfo.filters.startFilters();
            app.yourStopInfo.filters.filterData();
        }
    }
});
