//zaciąganie danych z API - informacja o przystanku

ns('app.yourStopsInfo.model.stopInfo', function () {
    return {
        getStopInfo: function () {
            app.dataManager.fetch('data/mock_Suchanino.json', [
                app.yourStopsInfo.view.init
            ])
        }
    };


});
