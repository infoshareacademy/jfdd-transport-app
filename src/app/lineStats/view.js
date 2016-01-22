/**
 * Created by agmo on 22.01.16.
 */
ns('app.lineStats.view', function() {

    return {
        init: function() {
            var $lineStatsDiv = $('#js-lineStats');
            var $h2 = $('<h2>').text('Statystyki opóźnień');

            $lineStatsDiv.append($h2);
        }
    }
});