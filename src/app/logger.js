ns('app.logger', function () {

    var events = [];

    var log = function(event){
        events.push(event);
    console.log(event);
        localStorage.setItem("Logger",JSON.stringify(events))
    };


    return {
        log:log
    }
});
