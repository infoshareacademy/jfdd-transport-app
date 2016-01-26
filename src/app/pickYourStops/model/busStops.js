//zaciąganie danych z API - nazwy przystanków

ns('app.pickYourStops.model.busStops', function () {
    return {
        getBusStops: function () {
            app.dataManager.fetch('https://isa-api.herokuapp.com/transport/stops.json', [
                app.pickYourStops.view.init
            ])
        }
    };


});
