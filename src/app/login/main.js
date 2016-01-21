ns('app.login.main', function () {

    function createPopup() {
    }

    function initializeSocialButton () {
        var onSuccess = function(googleUser) {
            console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
            //$('.popup').hide();
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

            var popup = document.createElement('div');

            popup.className = 'popup';
            document.body.appendChild(popup);
            $('<p>Zaloguj się przez:</p>').appendTo(popup);

            var $close = $('<span>x</span>');
            $close.appendTo(popup);

            function quit() {
                window.location.href = 'http://localhost:63342/jfdd-transport/index.html';
            }

            $close.click(quit);

            initializeSocialButton();

            $("#my-signin2").appendTo(popup);

        }
    };
});