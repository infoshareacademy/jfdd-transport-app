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
                    .append($('<button id="pickStop">').text("Wybierz")).append($('<div class="selectedStop">'));

                $('#pickStop').on('click', function () {

                        $('.selectedStop').append(
                            '<div>' + $('#js-pickYourStops input').val() + '</div>'
                        );
                    }
                );
            }
        }
    }
);

