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

    function filterOneDiv() {

        var filteredOutStops = app.yourStopInfo.filters.filterOne();
        showDiv(filteredOutStops);
        //app.yourStopInfo.filters.startFilters();
        //app.yourStopInfo.filters.filterData();
    }

    function filterTwoDiv() {
        //var filteredOutLines = app.yourStopInfo.filters.filterTwo();
        //showDiv(filteredOutLines);
        //app.yourStopInfo.filters.startFilters();
        //app.yourStopInfo.filters.filterData();
    }


    return {
        init: function () {
            var favStops = app.pickYourStops.model.user.favouriteStops();
            showDiv(favStops);
        },
        filterOneDiv: filterOneDiv,
        showDiv:showDiv,
        filterTwoDiv: filterTwoDiv
    }

});