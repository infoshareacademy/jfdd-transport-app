ns('app.dataManager', function () {


    function save(user, state){
        localStorage.setItem(user.username, JSON.stringify(state.stopsArray));
    }

    function load(user){
        return JSON.parse(localStorage.getItem(user.username)) || {};
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