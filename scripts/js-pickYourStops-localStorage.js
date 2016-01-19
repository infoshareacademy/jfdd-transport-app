/**
 * Created by Agnieszka on 2016-01-19.
 */
var favouriteStops = {
    favouriteStop1: 'Migowo',
    favouriteStop2: 'Dworzec Główny',
    favouriteStop3: 'Żabi Kruk'
};

$(function () {
    var $pickYourStopsContainer = $('#js-pickYourStops');

    var getUserName = (function () {
        var userName;
        var id = 0;
        return function () {
            id++;
            userName = 'użytkownikTestowy' + id;
            return userName;
        };
    }());

    var checkLocalStorage = function (key) {
        var value;
        var result = [];

        if (window.localStorage) {
            console.log('Local Storage supported');

            for (var key in localStorage) {
                value = localStorage.getItem[key];
                result.push(value);
            }
        } else {
            console.log('Local Storage is not supported');
            return;
        }

        return result;
    };

    var updateLocalStorage = function () {
        localStorage.setItem();//TODO
    };

    var getFavouriteStops = function () {
        for (var i = 0; i < localStorage.length; i++) {
            favouriteStops['favouriteStop' + i] = localStorage[i];
        }
    };

    var $testButton = $('<button>');
    $testButton.attr({type: 'button', id: 'testLocalStorage'});
    $testButton.text('Test zapamiętywania w local storage');

    $pickYourStopsContainer.append($testButton);

    $('#testLocalStorage').on('click', function () {
        if (favouriteStops.favouriteStop1) {
            for (var key in favouriteStops) {
                if (favouriteStops.hasOwnProperty(key)) {
                    $pickYourStopsContainer.append(favouriteStops[key]);
                }
            }
        } else {
            //TODO
        }
    });
});