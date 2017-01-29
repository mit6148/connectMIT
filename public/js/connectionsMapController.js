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
                                var url = '../users/viewProfile/' + address[2];
                                var content = '<div id="markerWindow" style="text-align: center;">' + '<h4>' + address[1] + '</h4>' + '<form method="get" action="' + url + '">' +             '<input class="button submitButtons" style="margin-top: 0px; margin-left: 0px; font-family: \'Karla\', sans-serif;" type="submit" value = "view profile">' +             '</form>' +             '</div>';
                                addMarker(position, map, content);
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
        addCurrentLocMarker({lat: current_lat, lng: current_lng}, map);
        return map;
    }

    function addMarker(location, map, content) {
        var infowindow = new google.maps.InfoWindow({
            content: content
        });


        var marker = new google.maps.Marker({
            position: location,
            map: map
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    }

    function addCurrentLocMarker(location, map) {

        var infowindow = new google.maps.InfoWindow({
            content: '<h4>' + "You" + '</h4>'
        });
        var image = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        // var image = 'http://crcfchurch.com/wp-content/uploads/2015/09/map-pin.png';
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: image
        });

        marker.addListener('click', function(){
            infowindow.open(map, marker);
        });
  }

});