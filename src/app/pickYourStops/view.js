//dodawanie nazw przystanków do listy
ns('app.pickYourStops.view', function () {
    return {
        init: function (busStops) {
            $('#js-pickYourStops')
                .append($('<select>')
                    .append(
                        busStops.map(
                            function (busStop) {
                                return $('<option>').text(busStop.name);
                            }
                        )
                    )
                );
        }
    }

});

