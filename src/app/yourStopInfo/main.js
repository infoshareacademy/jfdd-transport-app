ns('app.yourStopInfo.main', function () {

    function showDiv() {
        var $jsyourStopInfo = $('#js-yourStopInfo');

        var tablicaPrzystanków = app.pickYourStops.model.user.favouriteStops();


        tablicaPrzystanków.forEach(function(przystanek) {
            $jsyourStopInfo.append(
                '<div class="stop1"><h3>' + przystanek + '<p class = "fetchingStatus"></p></h3></div>'
            )
        });

    }


return {
    init: function() {
        showDiv();
    }
}

});