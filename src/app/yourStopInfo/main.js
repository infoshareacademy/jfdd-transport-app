ns('app.yourStopInfo.main', function () {

    function showDiv() {
        var $jsyourStopInfo = $('#js-yourStopInfo');

        $jsyourStopInfo.append('<h1>Twoje przystanki: </h1>');
        $jsyourStopInfo.append('<div class="stop1"><h3>Przystanek 1<p class = "fetchingStatus"></p></h3></div>');
        $jsyourStopInfo.append('<div class="stop2"><h3>Przystanek 2<p class = "fetchingStatus"></p></h3></div>');
        $jsyourStopInfo.append('<div class="stop3"><h3>Przystanek 3<p class = "fetchingStatus"></p></h3></div>');
    }

    var result1=[];
    var result2=[];


    function getJsonData() {

        var $fetchingStatus = $('.fetchingStatus');
        $fetchingStatus.text('Pobieranie...');

        $.ajax({
            type: "GET",
            dataType: 'jsonp',
            data: {},
            url: 'http://jsonplaceholder.typicode.com/posts',

            success: function (data) {
                $fetchingStatus.hide();
                console.log(data);
                var $kontener1 = $('.stop1');
                var $kontener2= $('.stop2');
                data.forEach(function (items) {

                    result1 = ($('<p>', {
                        value: items.title
                    }).text(items.title));

                   result2 = ($('<p>', {
                        value: items.id
                    }).text(items.id));

                    $kontener1.append(result1);
                    $kontener2.append(result2)
                });
            }
        });

    }

function fillIn () {
    var $kontener3 = $('.stop3');
    $kontener3.append(result1);
}

return {
    init: function() {
        showDiv();
        getJsonData();
        fillIn();
    }
}

});