//zaciąganie danych z API - nazwy przystanków

ns('app.pickYourStops.model.busStops', function () {
    return {
        getBusStops: function () {
            app.dataManager.fetch('data/mock_busStops.json', [
                app.pickYourStops.view.init
            ])
        }
    };


});
