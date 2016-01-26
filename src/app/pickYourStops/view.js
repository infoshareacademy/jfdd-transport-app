//dodawanie nazw przystanków do listy i wyświetlanie wybranych przystanków
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
                    .append($('<button id="myBtn">').text("Wybierz")).append($('<div class="selectedStop">'));

                $('#myBtn').on('click', function () {
                        var favStop = $('#js-pickYourStops input').val();
                        $('.selectedStop').append(
                            '<div>' + favStop + '</div>'
                        );

                        app.pickYourStops.model.user.addToFavouriteStops(favStop);
                    }
                );
            }
        }
    }
);

