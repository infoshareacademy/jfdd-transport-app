ns('app.yourStopInfo.main', function () {

    function showDiv() {
        var $jsyourStopInfo = $('#js-yourStopInfo');
        var stopsArray = app.pickYourStops.model.user.favouriteStops();

        stopsArray.forEach(function (yourStop) {
            $jsyourStopInfo.append(
                '<div class="yourStop"><h3>' + yourStop + '<p class = "fetchingStatus"></p></h3></div>'
            )
        });
    }

    return {
        init: function () {
            showDiv();
            var stopsArray = app.pickYourStops.model.user.favouriteStops();
        }
    }

});