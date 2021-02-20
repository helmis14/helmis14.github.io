/*

[Master JS File (Unminified) : MAIN.JS]
–––––––––––––––––––––––––––––––––––––––––––––––––– 

 * Dyon - Simple vCard Resume Template
 * Author: Themesit, http://www.themesit.com
 */

(function() {
    "use strict"; // Start of use strict

    /** Loader */
    var loader = $('.loader');
    var wHeight = $(window).height();
    var wWidth = $(window).width();
    var i = 0;
    /*Center loader on half screen */
    loader.css({
        top: wHeight / 2 - 2.5,
        left: wWidth / 2 - 200
    })
    do {
        loader.animate({
            width: i
        }, 10)
        i += 3;
    } while (i <= 400)
    if (i === 402) {
        loader.animate({
            left: 0,
            width: '100%'
        })
        loader.animate({
            top: '0',
            height: '100vh'
        })
    }
    /* This line hide loader and show content */
    setTimeout(function() {
        $('.loader-wrapper').fadeOut("fast");
        (loader).fadeOut("fast");
        /*Set time in milisec */
    }, 3500);

    /** Animation on scroll */
    function elementInView() {
        var $animatedElements = $(".anim");
        var $window = $(window);

        $window.on('scroll resize', function() {
            var windowHeight = $window.height();
            var windowTopPosition = $window.scrollTop();
            var windowBottPosition = (windowTopPosition + windowHeight);

            $.each($animatedElements, function() {
                var $element = $(this);
                var elementHeight = $element.outerHeight();
                var elementTopPosition = $element.offset().top;
                var elementBottPosition = (elementTopPosition + elementHeight);

                // Check to see if this current container is within viewport
                if ((elementBottPosition >= windowTopPosition) &&
                    (elementTopPosition <= windowBottPosition)) {
                    $element.addClass('animated');
                    //$element.removeClass('anim');

                    // Animate progress bar
                    if ($element.hasClass('progress-bar')) {
                        $element.css('width', $element.attr('data-percent') + '%');
                    }

                }
                //else {
                //$element.removeClass('animated');
                //}
            });
        });

        $window.trigger('scroll');

    }

    $(document).ready(function() {

        /** Animation on scroll */
        elementInView();

        /** Set Full Height for Intro/ Section */
        $('#intro').height(parseInt($(window).height()));

        /** Background Image */
        $('.bg-image').each(function() {
            var $imgPath = $(this).attr("data-image");
            $(this).css('background-image', 'url(' + $imgPath + ')');
        });

        if (matchMedia('(min-width: 1200px)').matches) {

            /** Main Navigation Trigger */
            $('.goto-right').on('click', function() {
                $('body').toggleClass('open-right');
            });

            $('.goto-left').on('click', function() {
                $('body').toggleClass('open-left');
            });

            $(window).scroll(function() {
                if ($(window).scrollTop() <= 0) {
                    $(document.body).removeClass('open-right');
                    $(document.body).removeClass('open-left');
                    $(document.body).addClass('open-back');
                }
            });

        }

        /** Site Navigation LocalScroll */
        $('.intro').localScroll({
            target: 'body',
            queue: true,
            duration: 400,
            hash: false,
        });

        /** Responsive video embed */
        $(".project-video").fitVids();

        /** Typed.js (Text typing effect) */
        $('.typed').typed({
            stringsElement: $('.typed-strings'),
            loop: true,
            backDelay: 1000,
            cursorChar: "_"
        });

        /** LightGallery init start */
        $('#works-container').lightGallery({
            showThumbByDefault: false,
            hash: false
        });

        /** Testimonial carousel */
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            autoplaySpeed: 1000,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            autoWidth: false,
            autoHeight: false,
            items: 1,
            loop: true,
            nav: false,
            dots: false,
            navText: false,
            animateOut: 'fadeOut',
        });

        /** Client carousel */
        $(".client-carousel").owlCarousel({
            autoplay: true,
            autoplaySpeed: 1000,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            autoWidth: false,
            autoHeight: false,
            items: 3,
            margin: 30,
            loop: true,
            nav: false,
            dots: false,
            navText: false,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 4
                },
                1000: {
                    items: 3
                },
                1440: {
                    items: 4
                },
                1600: {
                    items: 5
                },
                2000: {
                    items: 6
                }
            }
        });

    });

    //ISOTOPE
    //ISOTOPE GLOBALS
    var $container1 = $('.works-container');

    //ISOTOPE INIT
    $(window).load(function() {

        //checking if all images are loaded
        $container1.imagesLoaded(function() {

            //init isotope once all images are loaded
            $container1.isotope({
                // options
                itemSelector: '.works-item',
                layoutMode: 'masonry',
                transitionDuration: '0.8s'
            });

            //forcing a perfect masonry layout after initial load
            setTimeout(function() {
                $container1.isotope('layout');
            }, 500);

            // triggering filtering
            $('.works-filter li a').on('click', function() {
                $('.works-filter li a').removeClass('active');
                $(this).addClass('active');

                var selector = $(this).attr('data-filter');
                $('.works-container').isotope({
                    filter: selector
                });
                setTimeout(function() {
                    $container1.isotope('layout');
                }, 700);
                return false;
            });

            //Isotope ReLayout on Window Resize event.
            $(window).on('resize', function() {
                $container1.isotope('layout');
                $('#intro').height(parseInt($(window).height()));
            });

            //Isotope ReLayout on device orientation changes
            window.addEventListener("orientationchange", function() {
                $container1.isotope('layout');
            }, false);

        });

    });

    /** Contact Form */
    $(".contact-form").on('submit', function(e) {
        e.preventDefault();
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = "Contact form submitted by " + name;
        var message = $("#message").val();
        var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message;

        function isValidEmail(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress);
        };

        if (isValidEmail(email) && (message.length > 1) && (name.length > 1)) {
            $.ajax({
                type: 'POST',
                url: 'php/contact.php',
                data: dataString,
                success: function() {
                    $(".success").fadeIn(1000);
                    $(".error").fadeOut(500);
                }
            });
        } else {
            $(".error").fadeIn(1000);
            $(".success").fadeOut(500);
        }

        return false;
    });

})();