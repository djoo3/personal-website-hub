//Daniel Joo 09/09/18, re-design of m-salt page, draft 1

window.onload = function() {

    //intro section animation code
    $('#intro-text h1').css({"opacity": "1", "transition": "0.5s"});
    setTimeout(function() {
        $('#intro-text h2').css({"opacity": "1", "transition": "0.5s"});
    }, 400);
    setTimeout(function() {
        $('#intro-text h2 b').css({"opacity": "1", "transition": "1s"});
    }, 300);
    setTimeout(function() {
        $('#intro-container a').css({"opacity": "1", "transition": "0.3s"});
    }, 800);

    //main section scrolling animation code
    var scrollFlag1 = true;
    var scrollFlag2 = true;
    var scrollFlag3 = true;
    var scrollFlag4 = true;
    var scrollFlag5 = true;

    $(window).scroll(function() {

        var h1T = $('#main-text h1').offset().top,
            h1H = $('#main-text h1').outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();

        if (wS > (h1T + h1H - wH)) {
            $('nav').css({"background-color": "#292929", "transition": "background-color 0.5s"});
            $('#food-video').css({"opacity": "0.25", "transition": "opacity 2s"});
        } else {
            $('nav').css({"background-color": "transparent", "transition": "background-color 0.5s"});
            $('#food-video').css({"opacity": "0.65", "transition": "opacity 2s"});
        }

        if (wS > (h1T + h1H - wH) && scrollFlag1){
            scrollFlag1 = false;
            $('#main-text h1 #blue-react').css({"color": "#4975BD", "transition": "color 0.7s"});
        }

        var pT = $('#main-text p').offset().top,
            pH = $('#main-text p').outerHeight();

        if (wS > (pT + pH - wH) && scrollFlag2) {
            scrollFlag2 = false;
            $('#main-text p').css({"opacity": "1", "transition": "opacity 1s"});
        }

        var h2aT = $('#main-text h2:nth-of-type(1)').offset().top,
            h2aH = $('#main-text h2:nth-of-type(1)').outerHeight();

        if (wS > (h2aT + h2aH - wH) && scrollFlag3) {
            scrollFlag3 = false;
            $('#main-text h2:nth-of-type(1)').css({"opacity": "1", "transition": "opacity 1s"});
            setTimeout(function() {
                $('#main-text a').css({"opacity": "1", "transition": "opacity 1s"});
            }, 1000);
        }

        var h2bT = $('#main-text h2:nth-of-type(2)').offset().top,
            h2bH = $('#main-text h2:nth-of-type(2)').outerHeight();

        if (wS > (h2bT + h2bH - wH) && scrollFlag4) {
            scrollFlag4 = false;
            $('#main-text h2:nth-of-type(2)').css({"opacity": "1", "transition": "opacity 1s"});
        }

        var bT = $('main #learn-button').offset().top,
            bH = $('main #learn-button').outerHeight();

        if (wS > (bT + bH - wH) && scrollFlag5) {
            scrollFlag5 = false;
            $('main #learn-button').css({"opacity": "1", "transition": "opacity 1s"});
        }
    });


}