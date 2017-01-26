$(function() {

    $.get('../users/user-location', function(resp) {
        if (resp) {
            var current_lat = resp.lat;
            var current_lng = resp.lng;
            var map = drawMap(current_lat, current_lng);

            $.get('../users/connections-locations', function(resp) {
                if (resp) {
                    resp.addresses.forEach(function(address) {
                        geocoder = new google.maps.Geocoder();
                        geocoder.geocode({
                            'address': address[0]
                        }, function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                var lat = results[0].geometry.location.lat();
                                var lng = results[0].geometry.location.lng();
                                var position = {
                                    lat: lat,
                                    lng: lng
                                }
                                addMarker(position, map, address[1]);
                            }
                        });
                    }); //end for Each	
                } else {
                    console.log("fail");
                }
            });

            var recenterControlDiv = document.createElement('div');
            var centerControl = new recenter(recenterControlDiv, map, {
                lat: current_lat,
                lng: current_lng
            });
            recenterControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(recenterControlDiv);

        } else {
            console.log("getting user's current location failed");
        }
    });

    function recenter(controlDiv, map, current_location) {
        console.log($('#recenter'));
        document.getElementById('recenter').style.visibility = 'visible';
        document.getElementById('recenter').addEventListener('click', function() {
            map.setZoom(5);
            map.setCenter(current_location);
        });
        controlDiv.appendChild(document.getElementById('recenter'));
    }

    function drawMap(current_lat, current_lng) {
        var center = {
            lat: current_lat,
            lng: current_lng
        };
        var map = new google.maps.Map(document.getElementById('map_connections'), {
            zoom: 5,
            center: center,
            mapTypeControl: false,
            streetViewControl: false,
            scrollwheel: false
        });
        var marker = new google.maps.Marker({
            position: center,
            map: map
        });
        return map;
    }

    function addMarker(location, map, name) {
        var infowindow = new google.maps.InfoWindow({
            content: name
        });


        var marker = new google.maps.Marker({
            position: location,
            map: map
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    }

});