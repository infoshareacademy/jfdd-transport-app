ns('app.logger', function () {

    var key = 'Logger';

    var log = function (event) {
        var currentLogger = JSON.parse(localStorage.getItem(key)) || [];
        currentLogger.push(event);
        localStorage.setItem(key, JSON.stringify(currentLogger))
    };

    var getLog = function () {
        return JSON.parse(localStorage.getItem(key)) || [];
    };


    return {
        init: function () {
            getLog: getLog
        },
        log: log
    }
});
