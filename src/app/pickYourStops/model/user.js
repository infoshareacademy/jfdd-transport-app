ns('app.pickYourStops.model.user', function () {
    var currentUser = {username: ""};
    var state;
    var updateStorage = function (busStop) {
        var stopsArray = state.stopsArray || [];
        stopsArray.push(busStop);
        state.stopsArray = stopsArray;
        app.dataManager.save(currentUser, state);
        app.logger.log({FavStop: busStop, UserName: currentUser.username}
        );
    };

    var getStops = function () {
        return state.stopsArray || [];
    };

    var removeFromStorage = function (stopName) {
        var stopsFromStorage = getStops();
        var filteredStops = stopsFromStorage.filter(function (busstop) {
            return busstop !== stopName;
        });
        state.stopsArray = filteredStops;
        app.dataManager.save(currentUser, state);
    };

    return {

        init: function (username) {
            currentUser.username = username;
            state = app.dataManager.load(username)
        },
        favouriteStops: getStops,
        addToFavouriteStops: updateStorage,
        removeFromFavouriteStops: removeFromStorage,
        currentUser: currentUser
    };
});