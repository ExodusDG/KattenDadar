/* DEFAULT SCRIPTS */
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

var header = $('#sticky__header');

$(window).on('resize scroll', function() {
    if ($('.default_header').isInViewport()) {
        header.removeClass('header__fixed')
        header.addClass('header__hidden')
    } else {
        header.addClass('header__fixed')
        header.removeClass('header__hidden')
    }
});

$('.header__lang div').click(function() {
    var clickedLang = $(this).text();
    var clickedFlag = $(this).find('img').attr('src');

    $('#language').text(clickedLang);
    $('#language_sticky').text(clickedLang);
    $('#icon__flag').attr('src', clickedFlag)
    $('#icon__flag').attr('src', clickedFlag)
    if (clickedLang == 'Dutch') {

    }
})

$('.mb__header_lang').click(function() {
    $('.mb__header_language').toggleClass('mb__header_language_open')
})

$('.mb__header_block').click(function() {
    var clickedLang = $(this).attr('id').replace('lang_', '')
    $('.mb__header_icon').attr('src', $('#image__' + clickedLang).attr('src'))

    $('.mb__header_language').removeClass('mb__header_language_open')
})

$('.lang__wrapper').click(function() {
    $('.header__lang').toggleClass('header__lang_open')
    $('.header__down').toggleClass('header__down_open')
})

var mobileHeader = $('.mb__header_sticky');

$(window).on('resize scroll', function() {
    if ($('.default_header').isInViewport()) {
        mobileHeader.removeClass('mb_header__fixed')
        mobileHeader.addClass('mb_header__hidden')
    } else {
        mobileHeader.addClass('mb_header__fixed')
        mobileHeader.removeClass('mb_header__hidden')
    }
});

/* DEFAULT SCRIPTS END */