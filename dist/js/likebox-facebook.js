$(document).ready(function(){
    $(".box-facebook-mini").hide()
    $(window).resize(function() {
        var tam = $(window).width();

        if (tam <= 1080) {
            $(".box-facebook-mini").show();

            $(".box-facebook").hide();

        } else {
            $(".box-facebook-mini").hide()
            $(".box-facebook").show();
        }
    });
});
