/* MAP MARKERS */

var markersList = [];
$.each(recentNotFound, (key, value) => {
    marker2 = new google.maps.Marker({
        position: { lat: Number(recentNotFound[key].lat), lng: Number(recentNotFound[key].lng) },
        map: map2,
        icon: 'img/homepage/recentSearches.svg',
        title: recentNotFound[key].picLink
    })
    markersList.push(marker2);
})

$.each(markersList, (key, value) => {
    var infowindow = new google.maps.InfoWindow({
        content: "<div class='infoWindow'><img style='width: 300px; margin: 0 auto' src='" + markersList[key].title + "'></div>",
    });

    markersList[key].addListener('mouseover', function() {
        infowindow.open(map, this);
    });

    markersList[key].addListener('mouseout', function() {
        infowindow.close();
    });
})

var allMarkers = [];
$.each(recentFound, (key, value) => {
    const marker3 = new google.maps.Marker({
        position: { lat: Number(recentFound[key].lat), lng: Number(recentFound[key].lng) },
        map: map2,
        icon: 'img/homepage/allSearches.svg',
        title: recentFound[key].picLink
    })
    allMarkers.push(marker3)
})
$.each(allMarkers, (key, value) => {
    var infowindow = new google.maps.InfoWindow({
        content: "<div class='infoWindow'><img style='width: 300px; margin: 0 auto' src='" + allMarkers[key].title + "'></div>",
    });

    allMarkers[key].addListener('mouseover', function() {
        infowindow.open(map2, this);
    });

    allMarkers[key].addListener('mouseout', function() {
        infowindow.close();
    });
})

/* MAP MARKERS END */

/* ALL MARKERS START */
var AllmarkersList = [];
var allMarker = [];
$('.current_right_b').click(function() {
    $.each(allNotFound, (key, value) => {
        marker2 = new google.maps.Marker({
            position: { lat: Number(allNotFound[key].lat), lng: Number(allNotFound[key].lng) },
            map: map2,
            icon: 'img/homepage/recentSearches.svg',
            title: allNotFound[key].picLink
        })
        AllmarkersList.push(marker2);
    })

    $.each(AllmarkersList, (key, value) => {
        var infowindow = new google.maps.InfoWindow({
            content: "<div class='infoWindow'><img style='width: 300px; margin: 0 auto' src='" + AllmarkersList[key].title + "'></div>",
        });

        AllmarkersList[key].addListener('mouseover', function() {
            infowindow.open(map, this);
        });

        AllmarkersList[key].addListener('mouseout', function() {
            infowindow.close();
        });
    })


    $.each(recentFound, (key, value) => {
        const marker3 = new google.maps.Marker({
            position: { lat: Number(recentFound[key].lat), lng: Number(recentFound[key].lng) },
            map: map2,
            icon: 'img/homepage/allSearches.svg',
            title: recentFound[key].picLink
        })
        allMarker.push(marker3)
    })
    $.each(allMarker, (key, value) => {
        var infowindow = new google.maps.InfoWindow({
            content: "<div class='infoWindow'><img style='width: 300px; margin: 0 auto' src='" + allMarker[key].title + "'></div>",
        });

        allMarker[key].addListener('mouseover', function() {
            infowindow.open(map2, this);
        });

        allMarker[key].addListener('mouseout', function() {
            infowindow.close();
        });
    })
})

$('.current_left_b').click(function() {
    $.each(allMarker, (key, value) => {
        allMarker[key].setMap(null);
    })
    $.each(AllmarkersList, (key, value) => {
        AllmarkersList[key].setMap(null);
    })
})

/* ALL MARKERS END */