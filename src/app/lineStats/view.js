/**
 * Created by agmo on 22.01.16.
 */
ns('app.lineStats.view', function () {

    var getLineList = function(lines) {
        var $datalistEl = $('#lines');

        $datalistEl.append(lines.map(function(line) {
            return $('<option>').attr('value', line.name);
        }));

    };

    var displaySortedBuses = function (lines) {
        var div = $('<div>');
        div.addClass('sortedLines voffset');

        var ul = $('<ul>');
        div.append(ul);

        lines.forEach(function (item) {
            var li = $('<li>');
            li.text(
                'Linia ' + item.lineName + item.delayToDisplay
            );
            ul.append(li);
        });
        $('#js-lineStats > div').append(div);
    };

    return {
        init: function () {
            app.dataManager.fetch('https://isa-api.herokuapp.com/transport/lines.json', [getLineList]);
        },
        displaySortedBuses: displaySortedBuses
    }
});