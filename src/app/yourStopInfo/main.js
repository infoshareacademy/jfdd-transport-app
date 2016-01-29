ns('app.yourStopInfo.main', function () {
    var toHHMMSS = function (seconds_parameter) {
        var sec_num = parseInt(seconds_parameter, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    };

    function showDiv(favStops) {
        var favStops = app.pickYourStops.model.user.favouriteStops();
        var $jsyourStopInfo = $('#js-yourStopInfo');
        $jsyourStopInfo.empty();

        favStops.forEach(function (stop) {
            $jsyourStopInfo.append(
                '<div class="yourStop"><h3>' + stop + '<p class = "fetchingStatus"></p></h3></div>'
            )
        });
        var stopsFromLocalStorageArray = app.pickYourStops.model.user.favouriteStops();
        //
        //
        //app.dataManager.fetch('https://isa-api.herokuapp.com/transport/lines.json', [
        //
        //]);


    }

    function filterOneDiv() {

        var filteredOutStops = app.yourStopInfo.filters.filterOne();
        showDiv(filteredOutStops);
        //app.yourStopInfo.filters.startFilters();
        //app.yourStopInfo.filters.filterData();
    }

    function filterTwoDiv() {
    }


    return {
        init: function () {
            var favStops = app.pickYourStops.model.user.favouriteStops();
            showDiv(favStops);
        },
        filterOneDiv: filterOneDiv,
        showDiv:showDiv,
        filterTwoDiv: filterTwoDiv,

    }

});