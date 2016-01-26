ns('app.pickYourStops.model.user', function () {
    var currentUser = '';

    var usernameInStorage = function (username) {
        return localStorage.getItem(username);
    };

    var displayUserStops = function (username) {
        return JSON.parse(localStorage.getItem[username]);
    };

    var updateStorage = function (busStop) {
        var stopsArray = JSON.parse(localStorage.getItem(currentUser)) || [];
        stopsArray.push(busStop);
        localStorage.setItem(currentUser, JSON.stringify(stopsArray));
    };

    var getStops = function () {
        var userStops = JSON.parse(localStorage.getItem(currentUser));
        console.log(userStops + ' ' + typeof userStops);
        return userStops;
    };

    var removeFromStorage = function () {
        console.log('removed');
    };

    return {

        init: function (username) {
            currentUser = username;
            if (usernameInStorage()) {
                console.log(displayUserStops(usernameInStorage(username)));
            } else {
                updateStorage('Migowo');
            }
        },
        favouriteStops: getStops,
        addToFavouriteStops: updateStorage,
        removeFromFavouriteStops: removeFromStorage
    };
});