ns('app.yourStopInfo.main', function () {

    var $jsyourStopInfo = $('#js-yourStopInfo');


    function showDiv() {
        var stopsArray = app.pickYourStops.model.user.favouriteStops();
        stopsArray.forEach(function (yourStop) {
            $jsyourStopInfo.append(
                '<div class="yourStop"><h3>' + yourStop + '<p class = "fetchingStatus"></p></h3></div>'
            )
        });
    }

    function filterDivs(){
        $jsyourStopInfo.empty();

        var filteredOutStops = app.yourStopInfo.filters.filterOne();
        app.yourStopInfo.filters.startFilters();
        filteredOutStops.forEach(function (yourStop) {
            $jsyourStopInfo.append(
                '<div class="yourStop"><h3>' + yourStop + '<p class = "fetchingStatus"></p></h3></div>'
            )
        });
    }

    return {
        init: function () {
            showDiv();
        },
        filterDivs: filterDivs,
        showDiv:showDiv
    }

});