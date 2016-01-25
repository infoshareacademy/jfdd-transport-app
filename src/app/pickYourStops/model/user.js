ns('app.pickYourStops.model.user', function () {

    var usernameInStorage = function (username) {
        return localStorage.getItem(username);
    };

    var displayUserStops = function (username) {
        return JSON.parse(localStorage.getItem[username]);
    };

    var updateStorage = function (username, stop) {
        var stopsArray = JSON.parse(localStorage.getItem(username)) || [];
        stopsArray.push(stop);
        localStorage.setItem(username, JSON.stringify(stopsArray));
    };

    var getStops = function () {
        return ['Migowo', 'Dworzec Główny', 'Żabi Kruk', 'Przymorze', 'Suchanino'];
    };

    return {

        init: function (username) {
            if (usernameInStorage()) {
                console.log(displayUserStops(usernameInStorage(username)));
            } else {
                updateStorage(username, getStops());
            }
        },
        favouriteStops: getStops,
        addToFavouriteStops: updateStorage
    };
});