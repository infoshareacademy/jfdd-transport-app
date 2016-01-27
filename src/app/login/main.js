ns('app.login.main', function () {

    function createPopup() {
        var popup = document.createElement('div');
        popup.className = 'popup';
        document.body.appendChild(popup);
        $('<p>Zaloguj się przez:</p>').appendTo(popup);
        $("#my-signin2").appendTo(popup);

        var $close = $('<span>x</span>');
        $close.appendTo(popup);
        $close.click(function(){window.location.href = 'http://test.transport.jfdd.infoshareaca.nazwa.pl/';});

    }

    function initializeSocialButton () {
        var onSuccess = function(googleUser) {
            var $name= googleUser.getBasicProfile().getName();
            $('main').removeClass('hide');
            app.pickYourStops.model.user.init($name);
            $('body').prepend("Witaj, " + $name +"!");
            $('.popup').hide();
            app.pickYourStops.model.busStops.getBusStops();
            app.yourStopInfo.main.init();
            app.yourStopInfo.filters.init();
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