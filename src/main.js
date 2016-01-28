$(function () {
    //app.login.main.init();
    //dataManager.fetch('http://costa.sadf/data.json', [pickYourStops.main.processData, login.main.processData]);
    app.lineStats.main.init();
    app.pickYourStops.model.busStops.getBusStops();
    app.yourStopInfo.main.init();
    app.yourStopInfo.filters.init();
    app.pickYourStops.model.user.init($name);
});



