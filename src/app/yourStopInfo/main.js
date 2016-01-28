ns('app.yourStopInfo.main', function () {

    var $jsyourStopInfo = $('#js-yourStopInfo');


    function showDiv(favStops) {
        $jsyourStopInfo.empty();
        favStops.forEach(function (busStop) {
            var busStopItem = $('<div class="yourStop"><span>' + busStop + '</span></div>');
            var btn = $('<button type="button" class="removeStopBtn">x</button>');
            $jsyourStopInfo.append(busStopItem);
            busStopItem.append(btn);
            btn.click(function () {
                app.pickYourStops.model.user.removeFromFavouriteStops(busStopItem.find('span').text());
                busStopItem.remove()
            });
            //<span class = "fetchingStatus"></span>
        });
    }

    function filterOneDiv() {

        var filteredOutStops = app.yourStopInfo.filters.filterOne();
        showDiv(filteredOutStops);
        app.yourStopInfo.filters.startFilters();
        app.yourStopInfo.filters.filterData();
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
        showDiv: showDiv,
        filterTwoDiv: filterTwoDiv
    }

});