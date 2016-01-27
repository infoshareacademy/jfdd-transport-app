ns('app.pickYourStops.model.user', function () {
    var currentUser = '';

    var updateStorage = function (busStop) {
        var stopsArray = JSON.parse(localStorage.getItem(currentUser)) || [];
        stopsArray.push(busStop);
        localStorage.setItem(currentUser, JSON.stringify(stopsArray));
    };

    var getStops = function () {
        return JSON.parse(localStorage.getItem(currentUser)) || [];
    };

    var removeFromStorage = function (stopName) {
        var stopsFromStorage = getStops();
        var filteredStops = stopsFromStorage.filter(function (busstop) {
            return busstop !== stopName;
        });
        localStorage.setItem(currentUser, JSON.stringify(filteredStops));
    };

    return {

        init: function (username) {
            currentUser = username;
        },
        favouriteStops: getStops,
        addToFavouriteStops: updateStorage,
        removeFromFavouriteStops: removeFromStorage
    };
});