ns('app.pickYourStops.model.user', function () {
    var currentUser = {username: ''};
    var state;
    var updateStorage = function (busStop) {

        state.favStops = state.favStops || [];
        state.favStops.push(busStop);

        app.dataManager.save(currentUser.username, state);
        app.logger.log({
            FavStop: busStop,
            UserName: currentUser.username
        });
    };

    var getStops = function () {
        state.favStops = state.favStops || [];

        return state.favStops;
    };

    var removeFromStorage = function (stopName) {
        state.favStops = state.favStops || [];

        state.favStops = state.favStops.filter(function (busstop) {
            return busstop !== stopName;
        });
        app.dataManager.save(currentUser, state);
    };

    return {

        init: function (username) {
            currentUser.username = username;
            state = app.dataManager.load(username);
            console.log(state);
        },
        favouriteStops: getStops,
        addToFavouriteStops: updateStorage,
        removeFromFavouriteStops: removeFromStorage,
        currentUser: currentUser
    };
});