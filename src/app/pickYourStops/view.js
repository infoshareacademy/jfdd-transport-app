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
                    .append($('<button id="myBtn">').text("Wybierz")).append($('<div class="selectedStop">'));
                /*document.getElementById("myBtn").onclick = displayStop;
                 function displayStop() {
                 document.getElementById("selectedStop").innerHTML = "przystanek";*/
                $('#myBtn').on('click', function () {

                        $('.selectedStop').append(
                            '<div>' + $('#js-pickYourStops input').val() + '</div>'
                        );

                        //busStops.map(
                        //    function (busStop) {
                        //        return $('.selectedStop').text(busStop.name);
                        //    })
                    }
                );
            }
        }
    }
);

