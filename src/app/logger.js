ns('app.logger', function () {

    var events = [];

    var log = function(event){
        events.push(event);
        console.log(event);
        localStorage.setItem("Logger",JSON.stringify(events))
    };

    var getLog = function(event){
        return JSON.parse(localStorage.getItem("Logger")) || {};
    };
    return {
        log:log
    }
});
