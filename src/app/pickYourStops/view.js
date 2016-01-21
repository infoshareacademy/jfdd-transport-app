//dodawanie nazw przystanków do listy
ns('src.app.pickYourStops', getBusStops(function (busStops) {
    var html = '<input list="browsers" name="browser" /><datalist id="browsers" />'
    $('#js-pickYourStops').append(html);
    busStops.forEach(function (busStop) {
        $('#browsers').append('<option value="' + busStop.name + '">');
    })

}));

