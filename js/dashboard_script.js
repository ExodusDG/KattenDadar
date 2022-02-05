/* GET DASHBOARD DATA */

var dashData = {};

var settings = {
    "url": "https://server.kattenradar.nl/test-get-dashboard-data",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
        "id": "nw9Ih938nGl"
    }
};

$.ajax(settings).done(function(response) {
    dashData = response

    generateHTML(dashData)
});

/* GET DASHBOARD DATA END */


function generateHTML(arr) {
    var tipsArray = arr.tips
    var searchArray = arr.searchareas;
    var statsArray = arr.stats

    tipsGenerate(tipsArray)
    searchAreas(searchArray)
    statsGenerate(statsArray)
        //console.log(arr)

    $('.dash__title span').text(arr.userName)
    $('#facebook_ad').attr('href', arr.fbPost)
    $('#instagram_ad').attr('href', arr.instaPost)


}

function searchAreas(arr) {

    $.each(arr, function(key, value) {
        var searchNumber = key + 1;
        $('.dash__places_items').append(`
<div class="dash__places_block" lat=` + arr[key].lat + ` lng=` + arr[key].lng + ` radius=` + arr[key].radius + ` targetReach=` + arr[key].targetReach + `>
                                    <div>
                                        <h1>Zoekgebied # ` + searchNumber + `</h1>
                                        <p>` + arr[key].city + `, ` + arr[key].street + `</p>
                                    </div>
                                    <div>
                                        <hr>
                                    </div>
                                </div>
`)
    })
}


function tipsGenerate(arr) {
    $.each(arr, function(key, value) {
        var avatarName;
        var tipName;
        if (value.platform == 'FB') {
            avatarName = 'FacebookTip'
            tipName = 'Facebook Tip'
        } else if (value.platform == 'IG') {
            avatarName = 'InstaTip'
            tipName = 'Instagram Tip'
        } else {
            avatarName = 'KattenTip'
            tipName = 'KattenRadar Tip'
        }

        $('.tips__list').append(`<div class="tips__items">
        <img src="img/dashboard/icons/` + avatarName + `.svg" alt="Tip">
        <div class="tips__title">
        <h1>` + tipName + `</h1>
        <p>` + value.date + `</p>
        </div>
        <div class="tips__item">
        <img src="img/dashboard/icons/Bubble.svg" alt="Bubble">
        <div class="tips__text">
                                        <p>` + value.content + `</p>
        </div>
        </div>
        </div>`)
    })
}


function statsGenerate(arr) {
    console.log(arr)

    //VIEWS
    const ctxViews = document.getElementById('viewsChart').getContext('2d');
    const chartViews = new Chart(ctxViews, {
        type: 'line',
        data: {
            labels: ['14', '15', '16', '17', '18', '19', '20'],
            datasets: [{
                label: '# of Votes',
                data: arr.impressions,

                backgroundColor: [
                    'rgba(248,163,91, 1)',
                ],
                borderColor: [
                    'rgba(248,163,91, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    //Likes
    const ctxLikes = document.getElementById('likesChart').getContext('2d');
    const chartLikes = new Chart(ctxLikes, {
        type: 'line',
        data: {
            labels: ['14', '15', '16', '17', '18', '19', '20'],
            datasets: [{
                label: '# of Votes',
                data: arr.likes,

                backgroundColor: [
                    'rgba(248,163,91, 1)',
                ],
                borderColor: [
                    'rgba(248,163,91, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    //Smiles
    const ctxSmiles = document.getElementById('smilesChart').getContext('2d');
    const chartSmiles = new Chart(ctxSmiles, {
        type: 'line',
        data: {
            labels: ['14', '15', '16', '17', '18', '19', '20'],
            datasets: [{
                label: '# of Votes',
                data: arr.interactions,

                backgroundColor: [
                    'rgba(248,163,91, 1)',
                ],
                borderColor: [
                    'rgba(248,163,91, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}









$('.arrow').hover(function() {
    imagePath = $(this).find('img').attr('src').replace('.svg', '');
    $(this).find('img').attr('src', imagePath + '_hover.svg');
}, function() {
    $(this).find('img').attr('src', imagePath + '.svg')
});


$('.dash__stats_arrow').hover(function() {
    imagePath = $(this).find('img').attr('src').replace('.svg', '');
    $(this).find('img').attr('src', imagePath + '_hover.svg');
}, function() {
    $(this).find('img').attr('src', imagePath + '.svg')
});
setTimeout(() => {

}, 1000);

function initMap() {

    var zoomNumber = 14;

    map = new google.maps.Map(document.getElementById("dash_map"), {
        zoom: Number(zoomNumber),
        center: { lat: Number(52.370216), lng: Number(4.895168) },
        mapTypeControl: false,
        mapTypeId: "terrain",
        fullscreenControl: false,
        zoomControl: false,
        draggable: false,
        scrollwheel: false,
        streetViewControl: false
    });

    const cityCircle = new google.maps.Circle({
        strokeColor: "#F8A35B",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#F8A35B",
        fillOpacity: 0.3,
        clickable: false,
        map,
        center: { lat: Number(52.370216), lng: Number(4.895168) },
        radius: Number(1000),
    });

    $('.dash__places_block').click(function() {
        //    alert('34')
        map.setCenter(new google.maps.LatLng(Number($(this).attr('lat')), Number($(this).attr('lng'))));
        cityCircle.setMap(null);

        cityCircle = new google.maps.Circle({
            strokeColor: "#F8A35B",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#F8A35B",
            fillOpacity: 0.3,
            clickable: false,
            map,
            center: { lat: Number($(this).attr('lat')), lng: Number($(this).attr('lng')) },
            radius: Number($(this).attr('radius') + '000'),
        });
    })

    var productTypes = [];

    $.ajax({
        url: 'https://server.kattenradar.nl/get-product-types',
        method: 'get',
        dataType: 'json',
        async: false,
        data: productTypes,
        success: function(data) {
            productTypes = data
        }
    });

    /* RANGE DRAGGABLE */
    var trackStep = $('.map__radius_track').width();


    $(".map__radius_draggable").draggable({
        containment: "parent",
        axis: "x",

        drag: function(e, ui) {
            x2 = ui.position.left;
            var trackPercent = ((x2 * 100) / trackStep).toFixed(0)
            if (trackPercent > (11 * 8.5)) {
                var radiusKM = 8;
                $('.range__km').text('8 km')
                map.setZoom(11)
                productTypesArr(radiusKM)
            } else if (trackPercent > (11 * 7)) {
                var radiusKM = 7;
                $('.range__km').text('7 km')
                map.setZoom(11)
                productTypesArr(radiusKM)
            } else if (trackPercent > (11 * 6)) {
                var radiusKM = 6;
                $('.range__km').text('6 km')
                productTypesArr(radiusKM)
            } else if (trackPercent > (10 * 5)) {
                var radiusKM = 5;
                $('.range__km').text('5 km')
                map.setZoom(11)
                productTypesArr(radiusKM)
            } else if (trackPercent > (10 * 4)) {
                var radiusKM = 4;
                $('.range__km').text('4 km')
                productTypesArr(radiusKM)
            } else if (trackPercent > (11 * 2)) {
                var radiusKM = 3;
                $('.range__km').text('3 km')
                map.setZoom(12)
                productTypesArr(radiusKM)
            } else if (trackPercent > (5 * 2)) {
                var radiusKM = 2;
                $('.range__km').text(radiusKM + ' km')
                map.setZoom(13.5)
                productTypesArr(radiusKM)
            } else if (trackPercent > (10 * 1)) {
                var radiusKM = 1;
                $('.range__km').text('1 km')
                map.setZoom(14)
                productTypesArr(radiusKM)
            } else if (trackPercent < (10 * 1)) {
                var radiusKM = 1;
                $('.range__km').text('1 km')
                map.setZoom(14)
                productTypesArr(radiusKM)
            }

        }
    });

    function productTypesArr(radiusKM) {
        $.each(productTypes, function(key, value) {
            if (value.radius == radiusKM) {
                $('.range__price').text(value.price + ' €')
                $('.map__price_count span').text(value.discount)
                $('.search__map_radius').text(value.impressions)
                cityCircle.setRadius(Number(radiusKM + '000'));
            }
        })
    }
}

$('.dash__stats_link').click(function() {
    var clickedSlide;

    if ($(this).attr('id') == 'views_link') {
        clickedSlide = 0;

        $('.dash__stats_info > div').removeClass('stats__active')
        $('.views').addClass('stats__active')

    } else if ($(this).attr('id') == 'likes_link') {
        clickedSlide = 1;

        $('.dash__stats_info > div').removeClass('stats__active')
        $('.likes').addClass('stats__active')

    } else {
        clickedSlide = 2;

        $('.dash__stats_info > div').removeClass('stats__active')
        $('.smiles').addClass('stats__active')
    }

    $('.dash__stats_link').removeClass('stats__active')
    $(this).addClass('stats__active')

    var translateWidth = clickedSlide * $('canvas').width();

    $('.canvas__wrapper').attr('style', 'transform: translateX(-' + translateWidth + 'px)')
})

$('.catfound__button, .dash__stop_button button').click(function() {
    setTimeout(() => {
        $('.catfound').addClass('feedbackShow');
    }, 100);
    header.removeClass('header__fixed')
    header.addClass('header__hidden')
    $('.blur__wrapper').attr('style', 'filter: blur(10px)')
})

$('.popup_close_cat').click(function() {
    catFoundClose()
})

$('.feedback').click(function() {
    catFoundClose()
})


function catFoundClose() {
    $('.catfound').removeClass('feedbackShow');
    $('.blur__wrapper').attr('style', 'filter: blur(0px)')

    header.addClass('header__fixed')
    header.removeClass('header__hidden')
}

$('.review_star').click(function() {
    var clickedStar = Number($(this).attr('id').replace('star_', ''))

    if (clickedStar == 1) {
        $('.review_star').find('path').attr('fill-opacity', '0.1')
        $('#star_1').find('path').attr('fill-opacity', '1')
    } else if (clickedStar == 2) {
        $('.review_star').find('path').attr('fill-opacity', '0.1')
        $('#star_1').find('path').attr('fill-opacity', '1')
        $('#star_2').find('path').attr('fill-opacity', '1')
    } else if (clickedStar == 3) {
        $('.review_star').find('path').attr('fill-opacity', '0.1')
        $('#star_1').find('path').attr('fill-opacity', '1')
        $('#star_2').find('path').attr('fill-opacity', '1')
        $('#star_3').find('path').attr('fill-opacity', '1')
    } else if (clickedStar == 4) {
        $('.review_star').find('path').attr('fill-opacity', '0.1')
        $('#star_1').find('path').attr('fill-opacity', '1')
        $('#star_2').find('path').attr('fill-opacity', '1')
        $('#star_3').find('path').attr('fill-opacity', '1')
        $('#star_4').find('path').attr('fill-opacity', '1')
    } else if (clickedStar == 5) {
        $('.review_star').find('path').attr('fill-opacity', '0.1')
        $('#star_1').find('path').attr('fill-opacity', '1')
        $('#star_2').find('path').attr('fill-opacity', '1')
        $('#star_3').find('path').attr('fill-opacity', '1')
        $('#star_4').find('path').attr('fill-opacity', '1')
        $('#star_5').find('path').attr('fill-opacity', '1')
    }

})

$('.catfound_orange').click(function() {
    $('.catfound__block').attr('style', 'display: none')
    $('.feedback__stars').attr('style', 'display: block')
})