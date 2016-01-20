var popup = document.createElement('div');
    popup.className = 'popup';
    document.body.appendChild(popup);
    $('<p>Zaloguj się przez:</p>').appendTo(popup);

var close = $('<span>x</span>');
    (close).appendTo(popup);


function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    $('.popup').remove();
}
function onFailure(error) {
    console.log(error);
}

//function popup() {
//    var $myDiv = $('#my-signin2');
//    $('<p>Zaloguj się przez</p>').appendTo("#my-signin2");
//}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'https://www.googleapis.com/auth/plus.login',
        'width': 250,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

$("#my-signin2").appendTo(popup);





//(function(){
//
//    var $myDiv = $('#my-signin2');
    //$('<p>Zaloguj się przez</p>').appendTo("#my-signin2");
//
//}());


//(function(){

    //login = login || {};

    //login.main = {
    //    init: function () {
    //        var popup = document.createElement ('div');
    //        var popupText = document.createTextNode("Zaloguj się przez:");
    //        popup.appendChild(popupText);
    //        document.body.appendChild(popup);
        //}

        //kaboom: function () {
        //
        //}
    //};

    //login.main.init();4


//}());

