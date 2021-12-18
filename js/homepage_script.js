var recentSearches = [{
    "notFound": {
        "991": {
            "lat": "52.1231241",
            "lng": "5.2773372",
            "picLink": "https://i.imgur.com/8z7gXAY.png",
            "acId": "991"
        },
        "1340": {
            "lat": "51.6410202",
            "lng": "4.8616901",
            "picLink": "https://i.imgur.com/HHHj62U.png",
            "acId": "1340"
        },
        "1354": {
            "lat": "53.1929671",
            "lng": "6.5641905",
            "picLink": "https://i.imgur.com/JIRcg3Z.png",
            "acId": "1354"
        }
    },
    "Found": {
        "1417": {
            "lat": "53.1862171",
            "lng": "6.597048699999999",
            "picLink": "https://i.imgur.com/JxRokdY.png",
            "acId": "1417"
        },
        "1342": {
            "lat": "51.6410202",
            "lng": "4.8646901",
            "picLink": "https://i.imgur.com/HHHj62U.png",
            "acId": "1340"
        },
    }
}];

var recentFound = recentSearches[0].Found;
var recentNotFound = recentSearches[0].notFound;

var allSearches = [{
    "notFound": {
        "991": {
            "lat": "52.1231241",
            "lng": "5.2773372",
            "picLink": "https://i.imgur.com/8z7gXAY.png",
            "acId": "991"
        },
        "1334": {
            "lat": "52.228063",
            "lng": "4.4471312",
            "picLink": "https://i.imgur.com/mLY710g.png",
            "acId": "1334"
        },
        "1340": {
            "lat": "51.6410202",
            "lng": "4.8616901",
            "picLink": "https://i.imgur.com/HHHj62U.png",
            "acId": "1340"
        },
        "1354": {
            "lat": "53.1929671",
            "lng": "6.5641905",
            "picLink": "https://i.imgur.com/JIRcg3Z.png",
            "acId": "1354"
        }
    }
}]

//$.ajax({
//    url: 'https://server.kattenradar.nl/test-as',
//    method: 'get',
//    dataType: 'json',
//    async: false,
//    data: recentSearches,
//    success: function(data) {
//        console.log(data)
//    }
//});

var trackStep = $('.map__radius_track').width();

$('.faq__item').click(function() {
    console.log('5')
    var currentFaq = $(this)
    currentFaq.find('.faq__item_answer').toggleClass('faq_ans_open')
    currentFaq.toggleClass('faq_open');

    if (currentFaq.hasClass('faq_open')) {
        $(this).find('.faq__open').attr('src', 'img/homepage/faq_minus.svg')
    } else {
        $(this).find('.faq__open').attr('src', 'img/homepage/faq_plus.svg')
    }
})

$('.current__map_buttons button').click(function() {
    $('.current__map_buttons button').removeClass('current__button_active')
    $(this).addClass('current__button_active')
})

var sliderNumber = 1;
$('.review__slider_dot').removeClass('slider__dot_active')
$('#slider_dot_' + sliderNumber).addClass('slider__dot_active')
setInterval(() => {
    var sliderCount = $('.reviews__image_wrapper img').length;
    var sliderWidth = $('.reviews__image_wrapper img').width();
    var sliderContainer = $('.reviews__image_wrapper')

    $('.review__slider_dot').removeClass('slider__dot_active')
    $('#slider_dot_' + sliderNumber).addClass('slider__dot_active')

    sliderNumber++;

    var translateWidth = (sliderNumber - 1) * sliderWidth;
    console.log(sliderCount)
    if (sliderNumber > sliderCount) {
        sliderNumber = 1;
        sliderContainer.attr('style', 'transform: translateX(-' + 0 + 'px)')
    } else {
        sliderContainer.attr('style', 'transform: translateX(-' + translateWidth + 'px)')
    }

}, 3000);

/* GOOGLE MAP */

// This example requires the Places library. Include the libraries=places + AIzaSyDFA6udGwPSgJt_QacZp9tatCTazR32t2U
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places">

$(".map__radius_draggable").draggable({
    containment: "parent",
    axis: "x",
    drag: function(e, ui) {
        x2 = ui.position.left;
        var trackPercent = (x2 * 100) / trackStep
        if (trackPercent > 90) {
            $('.map__radius_draggable').text('7 km')
            mapRadius = 9;
        } else if (trackPercent > 75) {
            $('.map__radius_draggable').text('6 km')
            mapRadius = 8;
        } else if (trackPercent > 60) {
            $('.map__radius_draggable').text('5 km')
            mapRadius = 7;
        } else if (trackPercent > 45) {
            $('.map__radius_draggable').text('4 km')
            mapRadius = 6;
        } else if (trackPercent > 30) {
            $('.map__radius_draggable').text('3 km')
            mapRadius = 5;
        } else if (trackPercent > 15) {
            $('.map__radius_draggable').text('2 km')
            mapRadius = 4;
        } else if (trackPercent < 15) {
            $('.map__radius_draggable').text('1 km')
            mapRadius = 3;
        }
    }
});

var myLatlng;
var userEmail;
var catAdress;

function initMap() {
    const componentForm = [
        'location',
        'locality',
        'administrative_area_level_1',
        'country',
        'postal_code',
    ];

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: { lat: 37.4221, lng: -122.0841 },
        mapTypeControl: false,
        mapTypeId: "terrain",
        fullscreenControl: false,
        streetViewControl: false
    });
    const map2 = new google.maps.Map(document.getElementById("current_map"), {
        zoom: 8,
        center: { lat: 52.1231241, lng: 5.2773372 },
        mapTypeControl: false,
        mapTypeId: "terrain",
        fullscreenControl: false,
        streetViewControl: false,
        disableDefaultUI: true
    });

    image = 'img/homepage/recentSearches.svg'
    const marker = new google.maps.Marker({ map: map, draggable: false, icon: image });
    const autocompleteInput = document.getElementById('location');
    const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
        fields: ["address_components", "geometry", "name"],
        types: ["address"],

    });

    $.each(recentNotFound, (key, value) => {
        const marker2 = new google.maps.Marker({
            position: { lat: Number(recentNotFound[key].lat), lng: Number(recentNotFound[key].lng) },
            map: map2,
            icon: 'img/homepage/recentSearches.svg',
            title: "some marker"
        })
    })
    var allMarkers = [];
    $('.current_right_b').click(function() {
        $.each(recentFound, (key, value) => {
            const marker3 = new google.maps.Marker({
                position: { lat: Number(recentFound[key].lat), lng: Number(recentFound[key].lng) },
                map: map2,
                icon: 'img/homepage/allSearches.svg',
                title: "some marker"
            })
            allMarkers.push(marker3)
        })
    })

    $('.current_left_b').click(function() {
        $.each(allMarkers, (key, value) => {
            allMarkers[key].setMap(null);
        })
    })

    var radiusOnMap;

    $('#location').keypress(function(e) {
        if (e.which == 13) {
            adressSelect()
            return false; //prevent duplicate submission
        }
    });

    function adressSelect() {
        marker.setVisible(false);
        const place = autocomplete.getPlace();
        catAdress = place.name;
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert('No details available for input: \'' + place.name + '\'');
            return;
        }
        renderAddress(place);
        fillInAddress(place);

        var mapRadius = 2;

        var markersArray = [];
        markersArray.push(
            [
                place.name, {
                    center: place.geometry.location,
                    population: mapRadius,
                }
            ]
        )
        const cityCircle = new google.maps.Circle({

        });
        if (radiusOnMap == true) {
            cityCircle.setMap(null);
            radiusOnMap = true;
        } else {
            const cityCircle = new google.maps.Circle({
                strokeColor: "#F8A35B",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#F8A35B",
                fillOpacity: 0.3,
                map,
                center: markersArray[0][1].center,
                radius: Math.sqrt(mapRadius) * 100,
            });
            radiusOnMap = true;
            console.log(radiusOnMap)
        }

        mapInput()

        function mapInput() {
            $('#map').removeClass('map__blured');
            $('.search__map_button').attr('style', 'border-top-right-radius: 0px')
            $('.search__map_form').addClass('form_in_top')
            $('.search__map_button').text('Aanmelden')
            $('.search__map_button').attr('id', 'map__button_top')

            document.cookie = "steps=2";
            document.cookie = "adress=" + catAdress;
            //    alert(document.cookie)
            document.location.href = "/search.html";
        }
    }
    $('.search__map_button').click(function() {
        adressSelect()
    })

    function fillInAddress(place) { // optional parameter
        const addressNameFormat = {
            'street_number': 'short_name',
            'route': 'long_name',
            'locality': 'long_name',
            'administrative_area_level_1': 'short_name',
            'country': 'long_name',
            'postal_code': 'short_name',
        };
        const getAddressComp = function(type) {
            for (const component of place.address_components) {
                if (component.types[0] === type) {

                    return component[addressNameFormat[type]];
                }
            }
            return '';
        };
        document.getElementById('location').value = getAddressComp('street_number') + ' ' +
            getAddressComp('route');
        for (const component of componentForm) {
            // Location field is handled separately above as it has different logic.
            if (component !== 'location') {
                document.getElementById(component).value = getAddressComp(component);
            }
        }
    }

    function renderAddress(place) {
        map.setCenter(place.geometry.location);
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    }
}

/* GOOGLE MAP END */