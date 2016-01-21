ns('app.yourStopInfo.main', function () {

   function showDiv (){
    var $jsyourStopInfo = $('#js-yourStopInfo');

    $jsyourStopInfo.append('<h1>Twoje przystanki: </h1>');
    $jsyourStopInfo.append('<div class="stop1"><h3>Przystanek 1</h3></div>');
    $jsyourStopInfo.append('<div class="stop2"><h3>Przystanek 2</h3></div>');
    $jsyourStopInfo.append('<div class="stop3"><h3>Przystanek 3</h3></div>');
   }


    function getJasonData() {
        $.ajax({
            url: ('http://jsonplaceholder.typicode.com/posts'),
            dataType: 'json',
            error: console.log('error'),
            success: function(response){
                var kontener = $('.stop1');
                response.forEach(function(title) {
                    kontener.append('<p>title</p>')

                })
            }
        })
    }




return {
    init: function() {
        showDiv();
        getJasonData();

    }
}

});