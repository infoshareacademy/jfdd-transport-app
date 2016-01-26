ns('app.yourStopInfo.main', function () {

    var $jsyourStopInfo = $('#js-yourStopInfo');


    function showDiv(favStops) {
        $jsyourStopInfo.empty();

        favStops.forEach(function (stop) {
            $jsyourStopInfo.append(
                '<div class="yourStop"><h3>' + stop + '<p class = "fetchingStatus"></p></h3></div>'
            )
        });
    }

    function filterDivs() {

        var filteredOutStops = app.yourStopInfo.filters.filterOne();
        app.yourStopInfo.filters.startFilters();

        showDiv(filteredOutStops);
    }

    return {
        init: function () {
            var favStops = app.pickYourStops.model.user.favouriteStops();
            showDiv(favStops);
        },
        filterDivs: filterDivs,
        showDiv:showDiv
    }

});