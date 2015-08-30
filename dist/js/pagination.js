
$(document).ready(function () {
    function changeBannerPosition()
    {
        /*$('.bannerRegua').css( "margin-left", ($(window).width() / 2) - 900 );*/
        $('.bannerPrincipal').css( "margin-left", ($(window).width() / 2) - 957 );
    }

    $(window).resize(function() {
        changeBannerPosition();
    });

    $(function(){
        $('.bannerPrincipal').slides({
            preload: true,
            preloadImage: '../img_files/loader.gif',
            play: 7000,
            pause: 1000,
            hoverPause: true,
            effect: "fade",
            crossfade: true
        });
    });
    $(document).ready(function(){
        changeBannerPosition();
    });
})






