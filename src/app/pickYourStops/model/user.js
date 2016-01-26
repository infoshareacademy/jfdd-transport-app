ns('app.pickYourStops.model.user', function () {
    var currentUser = '';

    var displayUserStops = function (username) {
        return JSON.parse(localStorage.getItem[username]);
    };

    var updateStorage = function (busStop) {
        var stopsArray = JSON.parse(localStorage.getItem(currentUser)) || [];
        stopsArray.push(busStop);
        localStorage.setItem(currentUser, JSON.stringify(stopsArray));
    };

    var getStops = function () {
        return JSON.parse(localStorage.getItem(currentUser)) || [];
    };

    var removeFromStorage = function () {
        console.log('removed');
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