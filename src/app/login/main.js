ns('app.login.main', function () {

    function createPopup() {
        var popup = document.createElement('div');
        popup.className = 'popup';
        document.body.appendChild(popup);
        $('<p>Zaloguj się przez:</p>').appendTo(popup);
        $("#my-signin2").appendTo(popup);

        var $close = $('<span>x</span>');
        $close.appendTo(popup);
        $close.click(function(){window.location.href = 'http://localhost:63342/jfdd-transport/index.html';});

    }

    function initializeSocialButton () {
        var onSuccess = function(googleUser) {
            var $name= googleUser.getBasicProfile().getName();
            $('html').append("Witaj, " + $name +"!");
            $('.popup').hide();
            app.pickYourStops.model.busStops.getBusStops();
            app.lineStats.main.init();
        };

        var onFailure = function(error) {
            console.log(error);
        };

        window.renderButton = function () {
            gapi.signin2.render('my-signin2', {
                'scope': 'https://www.googleapis.com/auth/plus.login',
                'width': 250,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': onSuccess,
                'onfailure': onFailure
            });
        };
    }

    return {
        init: function () {
            initializeSocialButton();
            createPopup();
        }
    };
});