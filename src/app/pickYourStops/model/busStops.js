//zaciąganie danych z API - nazwy przystanków

ns('app.pickYourStops.model.busStops', function () {
    return {
        getBusStops: function (callback) {
            dataManager.fetch('src/modules/pickYourStops/mock_busStops.json', [function (data) {
                data.forEach(function (busStop) {
                    pickYourStops.model.busStops.push(busStop);
                });

                callback(pickYourStops.model.busStops);
            }])
        }
    };


});
