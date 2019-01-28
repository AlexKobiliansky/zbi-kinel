$(function() {

    $(window).on('load', function (){

        $('.adv-wrap .owl-thumb-item:nth-child(2)').addClass('col-lg-8');

        $('.prod-slider').owlCarousel({
            loop:true,
            margin:30,
            nav:true,
            navText: ["", ""],
            items: 4,
            responsive : {
                0 : {
                    items: 1,
                },
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

        /**
         * ABOUT-SLIDER BEHAVIOUR
         * @type {*|jQuery}
         */
        var aboutSlider = $('.about-slider').owlCarousel({
            loop: true,
            items: 1,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            autoplay: true,
            autoplayTimeout: 9000,
            mouseDrag: false,
            touchDrag: false
        });

        var aboutSliderData = aboutSlider.data();

        if(aboutSliderData) {
            var carouselOptions = aboutSliderData['owl.carousel'].options;
            var input = $('.s-about input');

            input.each(function(){
                $(this).focus(function(){
                    carouselOptions.autoplay = false;
                    aboutSlider.trigger('refresh.owl.carousel');
                });
            });

            input.each(function(){
                $(this).blur(function(){
                    carouselOptions.autoplay = true;
                    aboutSlider.trigger('refresh.owl.carousel');
                });
            });
        }

        /**
         * end ABOUT-SLIDER BEHAVIOUR
         */


        $(window).resize(function() {
            heightses();
        });

        heightses();

        $('.preloader').fadeOut(600);

        ymaps.ready(function(){
            var mapId = $('#map'),
                attitude = mapId.data("att"),
                longtitude = mapId.data("long"),
                zoom = mapId.data("zoom"),
                marker = mapId.data("marker"),
                map = new ymaps.Map("map", {
                    center: [attitude, longtitude],
                    controls: ['zoomControl'],
                    zoom: zoom
                }),

                myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: marker,
                    // Размеры метки.
                    iconImageSize: [26.6, 42.4],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-16, -30]
                });

            map.geoObjects.add(myPlacemark);
            map.behaviors.disable('scrollZoom');

            if ($(window).width() <= 480) {
                map.behaviors.disable('drag');
            }
        });
    });


    function heightses() {
        if ($(window).width()>768) {
            $('.news-item-title').height('auto').equalHeights();
        }
        $('.prod-slide-img').height('auto').equalHeights();
        $('.prod-slide-title').height('auto').equalHeights();

        $('.s-about').height('auto').equalHeights();


    }



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

    /**
     * FORMS
     */
    $(".user-phone").mask("+7 (999) 999-99-99",{autoclear: false});

    $(".user-phone").on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });
    /**
     * end FORMS
     */

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });


    $(function() {
        $("a[href='#popup-form']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });


    $('.docs-wrap').photoswipe();




    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);
        t = th.find(".btn").text();
        th.find(".btn").prop("disabled", "disabled").addClass("disabled").text("Отправлено!");


        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            setTimeout(function() {
                th.find(".btn").removeAttr('disabled').removeClass("disabled").text(t);
                th.trigger("reset");
                $.magnificPopup.close();
            }, 2000);
        });
        return false;
    });
});
