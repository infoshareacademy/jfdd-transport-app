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
          console.log('Function from user was initiated');//TODO remove after testing
          if(usernameInStorage()) {
              console.log(displayUserStops(usernameInStorage(username)));
              //app.pickYourStops.view.updateDisplayedStops(); //TODO in FDT-74
          } else {
              //app.pickYourStops.model.busStops.getUserStops(); //TODO in FDT-74
              updateStorage(username, getStops());
          }
      }
    };
});