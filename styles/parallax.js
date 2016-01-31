/**
 * Created by ASUS on 2016-01-31.
 */
function setBackgroundPosition() {

    $('main').css('background-position-y', + $(window).scrollTop() * .6);
}
$(window).on('load scroll', setBackgroundPosition);

