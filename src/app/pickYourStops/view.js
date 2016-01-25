//dodawanie nazw przystanków do listy i wyświetlanie wybranych przystanków
ns('app.pickYourStops.view', function () {
        return {
            init: function (busStops) {
                $('#js-pickYourStops')
                    .append($('<input list="stops">').append($('<datalist id="stops">')
                        .append(
                            busStops.map(
                                function (busStop) {
                                    return $('<option>').attr('value', busStop.id);
                                }
                            )
                        ))
                    )
                    .append($('<button type="button" id="pickStop">').text("Wybierz")).append($('<div class="selectedStop">'));

                $('#pickStop').on('click', function () {
                        var inputList = $('#js-pickYourStops input[list="stops"]');
                        if (inputList.val()) {
                            // logika zapisywania do local storage
                            // jak wywolac funkcje modelu user albo busStops?
                            // np. busStops.saveBusStop();

                            // dodatkowo przycisk z usuwaniem wybranego elementu, rowniez trzeba by wywolac funckje typu removeUsersBusStop() user model z id przystanku
                            $('.selectedStop').append(
                                '<div><span>' + inputList.val() + '</span><button onclick=" + userModelCostam.removeUsersBusStop(inputList.val()) + ">usuń</button></div>'
                            );

                            inputList.val('');
                        }
                    }
                );
            }
        }
    }
);

//