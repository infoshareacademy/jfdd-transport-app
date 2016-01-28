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
                .append($('<button type="button" id="pickStop">').text("Wybierz"));//.append($('<div class="selectedStop">'));

            $('#pickStop').on('click', function () {
                    var inputList = $('#js-pickYourStops input[list="stops"]');
                    var selectedBusStop = inputList.val();
                    if (selectedBusStop) {

                        app.pickYourStops.model.user.addToFavouriteStops(selectedBusStop);
                        // $('.selectedStop').append(
                        app.yourStopInfo.main.showDiv(app.pickYourStops.model.user.favouriteStops());
                        /*$('<div><span>' + inputList.val() + '</span><button type="button" class="removeStopBtn">usuń</button></div>').click(function () {
                         app.pickYourStops.model.user.removeFromFavouriteStops($(this).find('span').text());
                         $(this).remove();*/

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
