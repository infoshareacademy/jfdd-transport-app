ns('app.dataManager', function () {
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
        }
    };
});