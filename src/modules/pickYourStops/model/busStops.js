//zaciąganie danych z API - nazwy przystanków

var pickYourStops = (function () {
    pickYourStops = pickYourStops || {};
    pickYourStops.model = pickYourStops.model || {};
    /*pickYourStops.model.busStops = {
     fetch: function(busStop) {}
     };*/

    pickYourStops.model.busStops = [];

    pickYourStops.getBusStops = function (callback) {
        dataManager.fetch('src/modules/pickyourstops/mock_busStops.json', [function (data) {
            data.forEach(function (busStop) {
                pickYourStops.model.busStops.push(busStop);
            });

            callback(pickYourStops.model.busStops);
        }])
    };

    return pickYourStops;
}());
