ns('app.logger', function () {
var events = [];
var log = function(event){
        events.push(event);
    console.log(events);
    };
    return {
        log:log
    }
});
