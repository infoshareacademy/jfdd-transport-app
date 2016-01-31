ns('app.state', function () {
    var state = {};

    return {
        init: function () {
            app.dataManager.fetch('https://isa-api.herokuapp.com/transport/lines.json', [
                app.yourStopInfo.timetable.prepareTimetables,
                app.yourStopInfo.filters.init
            ]);
            app.dataManager.fetch('https://isa-api.herokuapp.com/transport/stops.json', [
                app.pickYourStops.view.init
            ]);
        },
        updateData : function () {
            app.dataManager.fetch('https://isa-api.herokuapp.com/transport/lines.json', [
                app.yourStopInfo.timetable.prepareTimetables
            ]);

        }
    }
});