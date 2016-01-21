ns('app.yourStopInfo.main', function () {

    function showDiv() {
        var $jsyourStopInfo = $('#js-yourStopInfo');

        $jsyourStopInfo.append('<h1>Twoje przystanki: </h1>');
        $jsyourStopInfo.append('<div class="stop1"><h3>Przystanek 1</h3></div>');
        $jsyourStopInfo.append('<div class="stop2"><h3>Przystanek 2</h3></div>');
        $jsyourStopInfo.append('<div class="stop3"><h3>Przystanek 3</h3></div>');
    }

    //$('#js-lineStats').click(function () {
    //    $.ajax({
    //        type: "GET",
    //        dataType: "jsonp",
    //        url: "http://jsonplaceholder.typicode.com/users",
    //        success: function(data){
    //            console.log(data);
    //            $select = $('<select/>');
    //            data.forEach(function (row) {
    //                $select.prepend($('<option>', {
    //                    value : row.name
    //                }).text(row.name))
    //            });
    //            $('#js-lineStats').prepend($select);
    //        }
    //    });
    //});
    //(function() {
    //    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    //    $.getJSON( flickerAPI, {
    //            tags: "mount rainier",
    //            tagmode: "any",
    //            format: "json"
    //        })
    //        .done(function( data ) {
    //            $.each( data.items, function( i, item ) {
    //                $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
    //                if ( i === 3 ) {
    //                    return false;
    //                }
    //            });
    //        });
    //})();

    $('#js-yourStopInfo').click(function () {
        $.ajax({
            type: "GET",
            dataType: 'jsonp',
            data: { get_param: 'value' },
            url: 'http://jsonplaceholder.typicode.com/posts',
            success: function (data) {
                var $kontener = $('.stop1');
                data.forEach(function (post) {
                    $kontener.prepend($('<option>', {
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