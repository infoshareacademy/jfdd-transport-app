//dodawanie nazw przystanków do listy, wyświetlanie oraz usuwanie wybranych przystanków
ns('app.pickYourStops.view', function () {
    var sortBusStops = function (busStopsToSort) {
        return busStopsToSort.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    };

    return {
        init: function (busStops) {
            var sortedBusStops = sortBusStops(busStops);
            $('#js-pickYourStops')
                .append($('<div class="form-inline wrapper col-sm-8 col-sm-offset-2">')
                    .append($('<div class="form-group">')
                        .append($('<div class="input-group">')
                            .append($('<input class="form-control input-sm" list="stops">')
                                .append($('<datalist id="stops">')
                                    .append(
                                        sortedBusStops.map(
                                            function (busStop) {
                                                return $('<option>').attr('value', busStop.name);
                                            }
                                        )
                                    )
                                )
                            )
                        )
                    )
                    .append($('<button  ng-click="$log.log(message)" class="btn btn-default btn-sm" type="button" id="pickStop">')
                        .text("Wybierz")
                    )
                );

            $('#pickStop').on('click', function () {
                    var inputList = $('#js-pickYourStops input[list="stops"]');
                    var selectedBusStop = inputList.val();
                    var busesAlreadyInStorage = app.pickYourStops.model.user.favouriteStops();
                    var busAlreadyPicked = busesAlreadyInStorage.indexOf(selectedBusStop) !== -1;

                    if (selectedBusStop && !busAlreadyPicked) {
                        app.pickYourStops.model.user.addToFavouriteStops(selectedBusStop);
                        app.yourStopInfo.timetable.prepareTimetables();
                        app.yourStopInfo.main.refresh();
                        inputList.val('');
                    }
                }
            );

        }
    }
});