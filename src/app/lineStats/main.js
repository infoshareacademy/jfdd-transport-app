/**
 * Created by agmo on 22.01.16.
 */
ns('app.lineStats.main', function () {

    return {
        init: function () {
            app.lineStats.view.init();
            $('#chooseLines').on('click', function () {
                var lineList = $('#js-lineStats input[list="lines"]');
                if (lineList.val()) {
                    $('#selectedLines').append('<div>' + lineList.val() + '</div>');
                }
                lineList.val('');
            });
        }
    };
});