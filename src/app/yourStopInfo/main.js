ns('app.yourStopInfo.main', function () {

    function showDiv() {
        var $jsyourStopInfo = $('#js-yourStopInfo');

        $jsyourStopInfo.append('<h1>Twoje przystanki: </h1>');
        $jsyourStopInfo.append('<div class="stop1"><h3>Przystanek 1</h3></div>');
        $jsyourStopInfo.append('<div class="stop2"><h3>Przystanek 2</h3></div>');
        $jsyourStopInfo.append('<div class="stop3"><h3>Przystanek 3</h3></div>');
    }

    $('#js-yourStopInfo').click(function () {
        $.ajax({
            type: "GET",
            dataType: 'jsonp',
            data: { get_param: 'value' },
            url: 'http://jsonplaceholder.typicode.com/posts',
            success: function (data) {
                console.log(data);
                var $kontener = $('.stop1');
                data.forEach(function (post) {
                    $kontener.prepend($('<p>', {
                        value: post.name
                    }).text(post.name))
                });
                $('#js-yourStopInfo').prepend($kontener);
            }

        });

    });






return {
    init: function() {
        showDiv();
        //getJasonData();

    }
}

});