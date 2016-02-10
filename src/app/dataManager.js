ns('app.dataManager', function () {

    function save(username, state){
        localStorage.setItem(username, JSON.stringify(state));
    }

    function load(username){
        return JSON.parse(localStorage.getItem(username)) || {};
    }

    return {
        fetch: function (url, callbacks) {
            $.ajax({
                url: url,
                success: function (data) {
                    callbacks.forEach(function (callback) {
                        callback(data);
                    })
                }
            });
        },
        save: save,
        load: load
    };
});