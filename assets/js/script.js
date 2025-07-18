/*
 Template Name: Ariel - App Landing page template + RTL
 Template URI: http://elmanawy.info/demo/ariel
 Description: 
 Author: Marwa El-Manawy
 Author URL: https://elmanawy.info
 Version: 1.0
 */

/*================================================
 [  Table of contents  ]
 ================================================
 :: Site Header
 :: ScrollIT
 :: WOW Animation
 :: OwlCarousel Screenshots
 :: OwlCarousel Blog Slider
 :: OwlCarousel Clients
 :: OwlCarousel Testimonials
 :: OwlCarousel Login & Signup
 :: LightBox
 :: Google Map
 :: Tooltip
 :: Countdown
 :: Back To Top
 :: Preloader
 ======================================
 [ End table content ]
 ======================================*/

(function ($) {
    'use strict';
    var $window = $(window);

    /*======================================
     Site Header
     ======================================*/

    $('.navbar-nav .nav-item .dropdown-item').on("click", function (e) {
        $('.navbar-collapse').removeClass('show');
    });
    $('.navbar-nav .nav-item a').on("click", function (e) {
        $('.navbar-collapse').removeClass('show');
    });
    $('.navbar-toggler').on("click", function (e) {
        $('.header-area').addClass('sticky');
    });
    // :: Sticky Active Code
    $window.on('scroll', function () {
        if ($window.scrollTop() > 0) {
            $('.header-area').addClass('sticky');
        } else {
            $('.header-area').removeClass('sticky');
        }
    });

    /*======================================
     ScrollIT
     ======================================*/
    $.scrollIt({
        upKey: 60, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'linear', // the easing function for animation
        scrollTime: 600, // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset: -70 // offste (in px) for fixed top navigation
    }
    );

    /*======================================
     WOW Animation
     ======================================*/
    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: false, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function (box) {
        }
        , scrollContainer: true // optional scroll container selector, otherwise use window
    }
    );
    wow.init();

    /*======================================
     OwlCarousel Screenshots
     ======================================*/
    $('.list_screen_slide').owlCarousel({
        loop: true,
        responsiveClass: true,
        nav: false,
        margin: 5,
        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 500,
        center: true,
        rtl: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3
            },
            1200: {
                items: 5
            }
        }
    });

    /*======================================
     OwlCarousel Blog Slider
     ======================================*/
    $('.blog-slider').owlCarousel({
        loop: true,
        responsiveClass: true,
        nav: true,
        dots: false,
        margin: 20,
        smartSpeed: 500,
        navText: ['<span class="ti-angle-left"></span>', '<span class="ti-angle-right"></span>'],
        rtl: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1
            },
            1200: {
                items: 3
            }
        }
    });

    /*======================================
     OwlCarousel Clients
     ======================================*/
    $('.list-clients').owlCarousel({
        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 500,
        loop: true,
        responsiveClass: true,
        nav: false,
        dots: false,
        margin: 25,
        rtl: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1
            },
            1200: {
                items: 5
            }
        }
    });

    /*======================================
     OwlCarousel Testimonials
     ======================================*/
    var review_photo2 = $('#review_details-1');
    review_photo2.owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        dots: true,
        autoplayTimeout: 4000,
        smartSpeed: 600,
        mouseDrag: true,
        touchDrag: true,
        rtl: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    });
    var review_photo = $('#review_photo-1');
    review_photo.owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        autoplayTimeout: 4000,
        smartSpeed: 600,
        mouseDrag: false,
        touchDrag: false,
        center: true,
        rtl: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            992: {
                items: 3
            }
        }
    });
    $('.review_nav .button_next').on('click', function () {
        review_photo.trigger('next.owl.carousel');
    });
    $('.review_nav .button_prev').on('click', function () {
        review_photo.trigger('prev.owl.carousel');
    });
    $('.review_nav .button_next').on('click', function () {
        review_photo2.trigger('next.owl.carousel');
    });
    $('.review_nav .button_prev').on('click', function () {
        review_photo2.trigger('prev.owl.carousel');
    });

    /*======================================
     OwlCarousel Login & Signup
     ======================================*/
    var review_photo3 = $('#review_details-2');
    review_photo3.owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        dots: false,
        autoplayTimeout: 4000,
        smartSpeed: 600,
        mouseDrag: false,
        touchDrag: false,
        rtl: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    });
    var review_photo4 = $('#review_photo-2');
    review_photo4.owlCarousel({
        loop: false,
        margin: 30,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 600,
        mouseDrag: false,
        touchDrag: false,
        center: true,
        rtl: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            992: {
                items: 3
            }
        }
    });

    /*======================================
     LightBox
     ======================================*/
    $('[data-rel^=lightcase]').lightcase({
        maxWidth: 1100,
        maxHeight: 800
    });

    /*======================================
     Google Map
     ======================================*/
    if ($('#google-map').length > 0) {
        //set your google maps parameters
        var latitude = 51.5255069,
                longitude = -0.0836207,
                map_zoom = 14;

        //google map custom marker icon 
        var marker_url = 'images/map-marker.png';

        //we define here the style of the map
        var style = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];

        //set google map options
        var map_options = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: map_zoom,
            panControl: true,
            zoomControl: true,
            mapTypeControl: true,
            streetViewControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            styles: style,
        }
        //inizialize the map
        var map = new google.maps.Map(document.getElementById('google-map'), map_options);
        //add a custom marker to the map				
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map,
            visible: true,
            icon: marker_url,
        });
    }

    /*======================================
     Tooltip
     ======================================*/
    $('[data-toggle="tooltip"]').tooltip();

    /*======================================
     Countdown
     ======================================*/
    if ($('.defaultCountdown').length > 0) {
        $('.defaultCountdown').countdown('2021/01/01', function (event) {
            $(this).html(event.strftime(''
                    + '<div class="col-3 col-md-3 counter-item"><span>%D</span> يوم%!d</div>'
                    + '<div class="col-3 col-md-3 counter-item"><span>%H</span> ساعات</div>'
                    + '<div class="col-3 col-md-3 counter-item"><span>%M</span> دقائق</div>'
                    + '<div class="col-3 col-md-3 counter-item"><span>%S</span> ثواني</div>'));
        });
    }

    /* =====================================
     Back To Top
     =====================================*/

    $('#back-to-top').fadeOut();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 250) {
            $('#back-to-top').fadeIn(1500);
        } else {
            $('#back-to-top').fadeOut(500);
        }
    });
    // scroll body to 0px on click
    $('#top').on('click', function () {
        $('top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    /*======================================
     Preloader
     ======================================*/
    $('#preloader').fadeOut('slow', function () {
        $(this).remove();
    });

})(jQuery);

$(document).ready(function() {
    const form = $("#emailForm");
    const nameInput = $("#name");
    const phoneInput = $("#phone");
    const email = $("#email");
    const messageInput = $("#message");
    const nameError = $("#name-error");
    const phoneError = $("#phone-error");

    // Use input event to restrict input to numeric values only
    phoneInput.on("input", function() {
        // Remove non-numeric characters
        const phoneNumber = phoneInput.val().replace(/[^0-9]/g, '');

        // Update the input value with the numeric version
        phoneInput.val(phoneNumber);
    });

    form.submit(function(event) {
        event.preventDefault();
        const phoneNumber = phoneInput.val().trim();

        // Get the selected language

        const phoneLength= "מספר הטלפון חייב להיות בין 7 ל-10 ספרות."

        // Check phone number length
        if (phoneNumber.length < 7 || phoneNumber.length > 10) {
            phoneError.text(phoneLength);
            return;
        }

        // Reset error messages
        phoneError.text("");

        const emailData = {
            to: "ionmedia.me@gmail.com",
            name: nameInput.val(),
            phone: phoneNumber,
            message: messageInput.val(),
            cc:"adham@fit-x.app"
        };

        $.ajax({
            type: "POST",
            url: "../send-email",
            contentType: "application/json",
            data: JSON.stringify(emailData),
            success: function(data) {
                if (data.success) {
                    $("#successMessage").show();
                    $("#errorMessage").hide();
                    window.location.href = "thank";

                    // Clear input fields after successful submission
                    nameInput.val("");
                    phoneInput.val("");
                    messageInput.val("");
                } else {
                    $("#successMessage").hide();
                    $("#errorMessage").show();
                }
            },
            error: function(error) {
                $("#errorMessage").show();
            }
        });
    });

    // Show error messages as the user types
    nameInput.on("input", function() {
        nameError.text("");
    });

    phoneInput.on("input", function() {
        phoneError.text("");
    });
});
$(document).ready(function() {
    const form = $("#emailForm2");
    const nameInput = $("#name2");
    const phoneInput = $("#phone2");
    const email = $("#email2");
    const messageInput = $("#message2");
    const nameError = $("#name-error2");
    const phoneError = $("#phone-error2");

    // Use input event to restrict input to numeric values only
    phoneInput.on("input", function() {
        // Remove non-numeric characters
        const phoneNumber = phoneInput.val().replace(/[^0-9]/g, '');

        // Update the input value with the numeric version
        phoneInput.val(phoneNumber);
    });

    form.submit(function(event) {
        event.preventDefault();
        const phoneNumber = phoneInput.val().trim();

        // Get the selected language

        const phoneLength= "מספר הטלפון חייב להיות בין 7 ל-10 ספרות."

        // Check phone number length
        if (phoneNumber.length < 7 || phoneNumber.length > 10) {
            phoneError.text(phoneLength);
            return;
        }

        // Reset error messages
        phoneError.text("");

        const emailData = {
            to: "ionmedia.me@gmail.com",
            name: nameInput.val(),
            phone: phoneNumber,
            message: messageInput.val(),
            cc:"adham@fit-x.app"
        };

        $.ajax({
            type: "POST",
            url: "../send-email",
            contentType: "application/json",
            data: JSON.stringify(emailData),
            success: function(data) {
                if (data.success) {
                    $("#successMessage").show();
                    $("#errorMessage").hide();
                    window.location.href = "thank";

                    // Clear input fields after successful submission
                    nameInput.val("");
                    phoneInput.val("");
                    messageInput.val("");
                } else {
                    $("#successMessage").hide();
                    $("#errorMessage").show();
                }
            },
            error: function(error) {
                $("#errorMessage").show();
            }
        });
    });

    // Show error messages as the user types
    nameInput.on("input", function() {
        nameError.text("");
    });

    phoneInput.on("input", function() {
        phoneError.text("");
    });
});
$(document).ready(function() {
    const form = $("#emailForm3");
    const nameInput = $("#name3");
    const phoneInput = $("#phone3");
    const email = $("#email3");
    const messageInput = $("#message3");
    const nameError = $("#name-error3");
    const phoneError = $("#phone-error3");

    // Use input event to restrict input to numeric values only
    phoneInput.on("input", function() {
        // Remove non-numeric characters
        const phoneNumber = phoneInput.val().replace(/[^0-9]/g, '');

        // Update the input value with the numeric version
        phoneInput.val(phoneNumber);
    });

    form.submit(function(event) {
        event.preventDefault();
        const phoneNumber = phoneInput.val().trim();

        // Get the selected language

        const phoneLength= "מספר הטלפון חייב להיות בין 7 ל-10 ספרות."

        // Check phone number length
        if (phoneNumber.length < 7 || phoneNumber.length > 10) {
            phoneError.text(phoneLength);
            return;
        }

        // Reset error messages
        phoneError.text("");

        const emailData = {
            to: "ionmedia.me@gmail.com",
            name: nameInput.val(),
            phone: phoneNumber,
            message: messageInput.val(),
            cc:"adham@fit-x.app"
        };

        $.ajax({
            type: "POST",
            url: "../send-email",
            contentType: "application/json",
            data: JSON.stringify(emailData),
            success: function(data) {
                if (data.success) {
                    $("#successMessage").show();
                    $("#errorMessage").hide();
                    window.location.href = "thank";

                    // Clear input fields after successful submission
                    nameInput.val("");
                    phoneInput.val("");
                    messageInput.val("");
                } else {
                    $("#successMessage").hide();
                    $("#errorMessage").show();
                }
            },
            error: function(error) {
                $("#errorMessage").show();
            }
        });
    });

    // Show error messages as the user types
    nameInput.on("input", function() {
        nameError.text("");
    });

    phoneInput.on("input", function() {
        phoneError.text("");
    });
});
$(document).ready(function() {
    const form = $("#emailForm4");
    const nameInput = $("#name4");
    const phoneInput = $("#phone4");
    const email = $("#email4");
    const messageInput = $("#message4");
    const nameError = $("#name-error4");
    const phoneError = $("#phone-error4");

    // Use input event to restrict input to numeric values only
    phoneInput.on("input", function() {
        // Remove non-numeric characters
        const phoneNumber = phoneInput.val().replace(/[^0-9]/g, '');

        // Update the input value with the numeric version
        phoneInput.val(phoneNumber);
    });

    form.submit(function(event) {
        event.preventDefault();
        const phoneNumber = phoneInput.val().trim();

        // Get the selected language

        const phoneLength= "מספר הטלפון חייב להיות בין 7 ל-10 ספרות."

        // Check phone number length
        if (phoneNumber.length < 7 || phoneNumber.length > 10) {
            phoneError.text(phoneLength);
            return;
        }

        // Reset error messages
        phoneError.text("");

        const emailData = {
            to: "ionmedia.me@gmail.com",
            name: nameInput.val(),
            phone: phoneNumber,
            message: messageInput.val(),
            cc:"adham@fit-x.app"
        };

        $.ajax({
            type: "POST",
            url: "../send-email",
            contentType: "application/json",
            data: JSON.stringify(emailData),
            success: function(data) {
                if (data.success) {
                    $("#successMessage").show();
                    $("#errorMessage").hide();
                    window.location.href = "thank";

                    // Clear input fields after successful submission
                    nameInput.val("");
                    phoneInput.val("");
                    messageInput.val("");

                } else {
                    $("#successMessage").hide();
                    $("#errorMessage").show();
                }
            },
            error: function(error) {
                $("#errorMessage").show();
            }
        });
    });

    // Show error messages as the user types
    nameInput.on("input", function() {
        nameError.text("");
    });

    phoneInput.on("input", function() {
        phoneError.text("");
    });
});
$(document).ready(function() {
    const form = $("#emailForm5");
    const nameInput = $("#name5");
    const phoneInput = $("#phone5");
    const email = $("#email5");
    const messageInput = $("#message5");
    const nameError = $("#name-error5");
    const phoneError = $("#phone-error5");

    // Use input event to restrict input to numeric values only
    phoneInput.on("input", function() {
        // Remove non-numeric characters
        const phoneNumber = phoneInput.val().replace(/[^0-9]/g, '');

        // Update the input value with the numeric version
        phoneInput.val(phoneNumber);
    });

    form.submit(function(event) {
        event.preventDefault();
        const phoneNumber = phoneInput.val().trim();

        // Get the selected language

        const phoneLength= "מספר הטלפון חייב להיות בין 7 ל-10 ספרות."

        // Check phone number length
        if (phoneNumber.length < 7 || phoneNumber.length > 10) {
            phoneError.text(phoneLength);
            return;
        }

        // Reset error messages
        phoneError.text("");

        const emailData = {
            to: "ionmedia.me@gmail.com",
            name: nameInput.val(),
            phone: phoneNumber,
            message: messageInput.val(),
            cc:"adham@fit-x.app"
        };

        $.ajax({
            type: "POST",
            url: "../send-email",
            contentType: "application/json",
            data: JSON.stringify(emailData),
            success: function(data) {
                if (data.success) {
                    $("#successMessage").show();
                    $("#errorMessage").hide();
                    window.location.href = "thank";

                    // Clear input fields after successful submission
                    nameInput.val("");
                    phoneInput.val("");
                    messageInput.val("");
                } else {
                    $("#successMessage").hide();
                    $("#errorMessage").show();
                }
            },
            error: function(error) {
                $("#errorMessage").show();
            }
        });
    });

    // Show error messages as the user types
    nameInput.on("input", function() {
        nameError.text("");
    });

    phoneInput.on("input", function() {
        phoneError.text("");
    });
});
var isMenuClicked = false;
$(document).ready(function() {
    
    $(window).scroll(function() {

        var scroll = $(window).scrollTop();
        if (scroll > 0) {
            if(!isMenuClicked){
             $('#logo2').show();
            $('#logo1').hide();
            $(".ti-menu").removeClass("whiteColorMenu")
            $(".navbar-toggler-icon").removeClass("whiteColorMenu")
            $(".ti-menu").addClass("blueColorMenu")
            $(".navbar-toggler-icon").addClass("blueColorMenu")
            }
            else {
                $('#logo2').hide();
                $('#logo1').show();
                $(".ti-menu").removeClass("blueColorMenu")
                $(".navbar-toggler-icon").removeClass("blueColorMenu")
                $(".ti-menu").addClass("whiteColorMenu")
                $(".navbar-toggler-icon").addClass("whiteColorMenu")
            }
            

        } else {
            $('#logo1').show();
            $('#logo2').hide();
            $(".ti-menu").addClass("whiteColorMenu")
            $(".navbar-toggler-icon").addClass("whiteColorMenu")
            $(".ti-menu").removeClass("blueColorMenu")
            $(".navbar-toggler-icon").removeClass("blueColorMenu")

        }
    });
    
});
function menuClick(){
    isMenuClicked=!isMenuClicked;
    // $(".navbar-expand-md").toggleClass("coloredMenu")
    // if(!isMenuClicked){
    //     $('#logo2').show();
    //    $('#logo1').hide();
    //    $(".ti-menu").removeClass("whiteColorMenu")
    //    $(".navbar-toggler-icon").removeClass("whiteColorMenu")
    //    $(".ti-menu").addClass("blueColorMenu")
    //    $(".navbar-toggler-icon").addClass("blueColorMenu")
    //    }
    //    else {
    //        $('#logo2').hide();
    //        $('#logo1').show();
    //        $(".ti-menu").removeClass("blueColorMenu")
    //        $(".navbar-toggler-icon").removeClass("blueColorMenu")
    //        $(".ti-menu").addClass("whiteColorMenu")
    //        $(".navbar-toggler-icon").addClass("whiteColorMenu")
    //    }
    
}

function navItemClick(){
    isMenuClicked=true;
    menuClick();
}


