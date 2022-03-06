var userID = 'nw9Ih938nGl'

var settings = {
    "url": "https://server.kattenradar.nl/test-get-tip-img",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
        "id": userID
    }
};

$.ajax(settings).done(function(response) {
    $('.tip_photo img').attr('src', response.img)
});


function checkInput() {
    if ($('#tip__message').val().length == 0 /*|| $('#tips__location').val().length == 0 || $('#data__picker').val().length == 0 || $('#time__picker').val().length == 0*/ ) {
        $('.tip__send_button').prop("disabled", true);
    } else {
        $('.tip__send_button').attr("disabled", null);
    }
}
var catAdress;
var catAdressCity;
var adressLat;
var adressLng;

$('.tip__send_button').click(function() {
    var settings = {
        "url": "https://server.kattenradar.nl/test-submit-tip",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "id": userID,
            "content": $('#tip__message').val(),
            "lat": adressLat,
            "lng": adressLng,
            "street": catAdress,
            "city": catAdressCity,
            "date": $('#data__picker').val(),
            "time": $('#time__picker').val(),
            "contactdata": $('#tip__contact').val()
        }
    };
    console.log(settings.data)
    $.ajax(settings).done(function(response) {
        //  console.log(response);
        if (response == 'failure') {
            tipError()
        } else if (response == 'success ') {
            tipDone()
        }
    });
})

function tipError() {
    $('.blur__wrapper').attr('style', 'filter: blur(10px)')
    $('.feedback').attr('style', 'display: block')

    header.removeClass('header__fixed')
    header.addClass('header__hidden')

    $('.tip_status').addClass('tip_status_active')
    $('.tip_done').attr('style', 'display: none')
    $('.tip_error').attr('style', 'display: block')
}

function tipDone() {
    $('.blur__wrapper').attr('style', 'filter: blur(10px)')
    $('.feedback').attr('style', 'display: block')

    header.removeClass('header__fixed')
    header.addClass('header__hidden')

    $('.tip_status').addClass('tip_status_active')
    $('.tip_done').attr('style', 'display: block')
    $('.tip_error').attr('style', 'display: none')
}

$('.tips__map_close').click(function() {
    $('.blur__wrapper').attr('style', 'filter: blur(0px)')
    $('.feedback').attr('style', 'display: none')

    header.addClass('header__fixed')
    header.removeClass('header__hidden')

    setTimeout(() => {
        $('.tip_status').removeClass('tip_status_active');
    }, 100);
})

$('#tips__location').click(function() {
    $('.blur__wrapper').attr('style', 'filter: blur(10px)')
    $('.feedback').attr('style', 'display: block')

    header.removeClass('header__fixed')
    header.addClass('header__hidden')

    setTimeout(() => {
        $('.tips__map').addClass('tipShow');
    }, 100);
})

function tipsMapClose() {
    $('.blur__wrapper').attr('style', 'filter: blur(0px)')
    $('.feedback').attr('style', 'display: none')

    header.addClass('header__fixed')
    header.removeClass('header__hidden')

    setTimeout(() => {
        $('.tips__map').removeClass('tipShow');
    }, 100);
}

$('.tips__map_close').click(function() {
    tipsMapClose()
})

$('.feedback').click(function() {
    $('.blur__wrapper').attr('style', 'filter: blur(0px)')
    $('.feedback').attr('style', 'display: none')

    header.addClass('header__fixed')
    header.removeClass('header__hidden')

    setTimeout(() => {
        $('.tips__map').removeClass('tipShow');
    }, 100);
})


function initMap() {
    const componentForm = [
        'location',
        'locality',
        'administrative_area_level_1',
        'country',
        'postal_code',
    ];


    var myLatLng = new google.maps.LatLng(38.8977, -77.0365);

    map = new google.maps.Map(document.getElementById("tips__map_container"), {
        zoom: 18,
        center: myLatLng,
        mapTypeControl: false,
        mapTypeId: "terrain",
        fullscreenControl: false,
        zoomControl: false,
        draggable: false,
        scrollwheel: false,
        streetViewControl: false
    });

    navigator.geolocation.getCurrentPosition(function(position) {
        userLat = position.coords.latitude;
        userLng = position.coords.longitude;
        console.log(userLat)
        map.setCenter(new google.maps.LatLng(userLat, userLng));
    });

    const autocompleteInput = document.getElementById('location');
    const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
        fields: ["address_components", "geometry", "name"],
        types: ["address"]

    });
    map.addListener('bounds_changed', function() {
        autocomplete.setBounds(map.getBounds());
    });

    $('#location').keypress(function(e) {
        if (e.which == 13) {
            adressSelect()
            return false;
        }
    });
    var radiusOnMap;

    const Marker = new google.maps.Marker({
        position: { lat: -33.89, lng: 151.274 },
        map,
        icon: 'img/homepage/allSearches.svg',
    });

    function adressSelect() {
        const place = autocomplete.getPlace();
        catAdress = place.address_components[0].long_name;
        catAdressCity = place.address_components[1].long_name;
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert('No details available for input: \'' + place.name + '\'');
            return;
        }
        renderAddress(place);
        fillInAddress(place);

        var markersArray = [];
        markersArray.push(
            [
                place.name, {
                    center: place.geometry.location,
                    population: 1,
                }
            ]
        )
        const Marker = new google.maps.Marker({
            position: markersArray[0][1].center,
            map,
            icon: 'img/tip_icon.svg',
        });

        console.log(markersArray[0][1].population)
        radiusOnMap = true;

        catAdress = catAdress;
        adressLat = place.geometry.location.lat();
        adressLng = place.geometry.location.lng();

    }
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        adressSelect()
    });

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
        city = place.address_components[2].short_name;

    }

    function renderAddress(place) {
        map.setCenter(place.geometry.location);
    }

    $('#map__button_top').click(function() {
        $('#tips__location').val(catAdress + ', ' + catAdressCity)
        tipsMapClose()
    })


    $(function() {
        $("#data__picker").datepicker({
            dateFormat: 'dd | mm | yy'
        });
    });

    $('.tip_date_block').click(function() {
        $("#data__picker").click();
    })

    $("#data__picker").click(function() {})

    $('#time__picker').timepicker();
    $('#tip__message').keyup(function() {
        checkInput()
    })
}
$('.location__clear').click(function() {
    $('#tips__location').prop('value', null);
})