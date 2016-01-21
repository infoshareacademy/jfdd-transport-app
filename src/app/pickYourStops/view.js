//dodawanie nazw przystanków do listy
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
                .append($('<button>').text("Wybierz"));
        }
    }

});

