ns('app.pickYourStops.model.user', function() {

    var usernameInStorage = function(username) {
        return localStorage.getItem(username);
    };

    var displayUserStops = function(username){
        return JSON.parse(localStorage.getItem[username]);
    };

    var updateStorage = function(username, stops) {
        localStorage.setItem(username, JSON.stringify(stops));
    };

    var getStops = function() {
        return ['Migowo', 'Dworzec Główny', 'Żabi Kruk'];
    };

    return {

      init: function (username) {
          if(usernameInStorage()) {
              console.log(displayUserStops(usernameInStorage(username)));
          } else {
              updateStorage(username, getStops());
          }
      }
    };
});