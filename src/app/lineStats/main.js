/**
 * Created by agmo on 22.01.16.
 */
ns('app.lineStats.main', function () {
    var displayStats = function (lines) {
        console.log('stats fetched');

        lines.filter(function () {

        });
    };

    return {
        init: function () {
            var currentLines = [];

            app.lineStats.view.init();

            $('#chooseLines').on('click', function () {
                var lineList = $('input[list="lines"]');
                if (lineList.val()) {
                    $('#selectedLines').append('<div>' + lineList.val() + '</div>');

                    currentLines.push(lineList.val());

                    if ($('#showStats').length < 1) {
                        $('#js-lineStats').append($('<button id="showStats" type="button">' + 'Wyświetl statystyki' + '</button>'));
                    }
                }
                lineList.val('');
            });

            $('#js-lineStats').on('click', '#showStats', function () {
                app.dataManager.fetch('https://isa-api.herokuapp.com/transport/lines.json', [displayStats]);
            });
        }
    };
});