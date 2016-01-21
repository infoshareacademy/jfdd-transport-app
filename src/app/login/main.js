ns('app.login.main', function () {

    return {
        init: function () {
            var popup = document.createElement('div');

            popup.className = 'popup';
            document.body.appendChild(popup);
            $('<p>Zaloguj się przez:</p>').appendTo(popup);

            var close = $('<span>x</span>');
            (close).appendTo(popup);

            function quit() {
                window.location.href = 'http://localhost:63342/jfdd-transport/index.html';
            }

            $(close).click(quit);

            function onSuccess(googleUser) {
                console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
                $('.popup').hide();
            }

            function onFailure(error) {
                console.log(error);
            }

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

        }
    };
});