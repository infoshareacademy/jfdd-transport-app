ns('app.yourStopInfo.js-yourStopInfo', function () {

   function showDiv (){
    var $jsyourStopInfo = $('#js-yourStopInfo');

    $jsyourStopInfo.append('<h1>Twoje Przystanki</h1>');
    $jsyourStopInfo.append('<h3 class="stop1">Przystanek 1</h3>');
    $jsyourStopInfo.append('<h3 class="stop2">Przystanek 2</h3>');
    $jsyourStopInfo.append('<h3 class="stop3">Przystanek 3</h3>');
   }

return {
    init: function() {
        showDiv();

    }
}

});