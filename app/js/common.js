$(function() {

    $(window).on('load', function (){

        $('.prod-slider').owlCarousel({
            loop:true,
            margin:30,
            nav:true,
            items: 1,
            navText: ["", ""],
            responsive : {
                480 : {
                    items: 2
                },
                768 : {
                    items: 3
                },
                1200 : {
                    items: 4
                }
            }
        });

        function heightses() {
            if ($(window).width()>480) {
            }
            $('.prod-slide-img').height('auto').equalHeights();
            $('.prod-slide-title').height('auto').equalHeights();
        }

        $(window).resize(function() {
            heightses();
        });
        heightses();

        // $('.preloader').fadeOut(600);
    });

    /**
     * mobile-mnu customization
     */
    var $toggleMenu = $(".toggle-mnu");

    $toggleMenu.click(function() {
        $(this).toggleClass("on");
        // return false;
    });

    var menuLogo = $('#mobile-mnu').data("logo");
    var $mmenu = $("#mobile-mnu").mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var API = $mmenu.data("mmenu");

    API.bind( "close:start", function() {
        setTimeout(function() {
            $toggleMenu.removeClass( "on" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
});
