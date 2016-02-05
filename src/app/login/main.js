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
        initializeSocialButton();
    }

    function prepareUI(name) {
        $('main').removeClass('hide');
        $('header').removeClass('hide');
        $('footer').removeClass('hide');
        $('.helloUser').prepend("Witaj, " + name +"!");
        $('.popup').hide();
    }

    function initializeSocialButton () {
        var onSuccess = function(googleUser) {
            var name = googleUser.getBasicProfile().getName();
            prepareUI(name);
            app.pickYourStops.model.user.init(name);
            app.state.init();
            app.yourStopInfo.main.init();
            app.lineStats.main.init();
        };

        var onFailure = function(error) {
            console.log(error);
        };

        window.renderButton = function () {
            gapi.signin2.render('my-signin2', {
                'scope': '//www.googleapis.com/auth/plus.login',
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
            createPopup();

            //var name = "John Doe";
            //prepareUI(name);
            //app.pickYourStops.model.user.init(name);
            //app.state.init();
            //app.yourStopInfo.main.init();
            //app.lineStats.main.init();
        }
    };
});