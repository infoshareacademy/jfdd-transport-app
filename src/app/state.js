ns('app.state', function () {
    var state = {};

    return {
        init: function () {
            app.dataManager.fetch('https://isa-api.herokuapp.com/transport/lines.json', [
                app.yourStopInfo.timetable.wpFunction
            ]);
            app.dataManager.fetch('https://isa-api.herokuapp.com/transport/stops.json', [
                app.pickYourStops.view.init
            ]);
        }

    }
});