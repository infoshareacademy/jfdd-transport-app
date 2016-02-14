ns('app.logger', function () {

    var key = 'Logger';
    var meta = {};

    var log = function(event){
        var currentLog = JSON.parse(localStorage.getItem(key)) || [];
        currentLog.push(event);
        localStorage.setItem(key,JSON.stringify(currentLog));
        meta.currentLog = currentLog;
    };

    var getLog = function (){
        return JSON.parse(localStorage.getItem(key)) || [];
    };


    return {
        init: function () {
            getLog()
        },
        log: log,
        meta: meta

    }
});
