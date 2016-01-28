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

    return {
        init: function () {
            app.dataManager.fetch('https://isa-api.herokuapp.com/transport/lines.json', [getLineList]);
        }
    }
});