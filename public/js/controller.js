$(function() {

    $.notify.addStyle("connected", {
        html: "<div>\n<span data-notify-text></span>\n</div>",
        classes: {
            base: {
                "font-weight": "bold",
                "padding": "8px 15px 8px 14px",
                "text-shadow": "0 1px 0 rgba(255, 255, 255, 0.5)",
                "border": "1px solid #fbeed5",
                "border-radius": "4px",
                // "border": "2px solid black",
                "white-space": "nowrap",
                "padding-left": "25px",
                "margin-bottom": "50px",
                "background-repeat": "no-repeat",
                "background-position": "3px 7px",
                "color": "#468847",
                "background-color": "#DFF0D8",
                "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAutJREFUeNq0lctPE0Ecx38zu/RFS1EryqtgJFA08YCiMZIAQQ4eRG8eDGdPJiYeTIwHTfwPiAcvXIwXLwoXPaDxkWgQ6islKlJLSQWLUraPLTv7Gme32zoF9KSTfLO7v53vZ3d/M7/fIth+IO6INt2jjoA7bjHCJoAlzCRw59YwHYjBnfMPqAKWQYKjGkfCJqAF0xwZjipQtA3MxeSG87VhOOYegVrUCy7UZM9S6TLIdAamySTclZdYhFhRHloGYg7mgZv1Zzztvgud7V1tbQ2twYA34LJmF4p5dXF1KTufnE+SxeJtuCZNsLDCQU0+RyKTF27Unw101l8e6hns3u0PBalORVVVkcaEKBJDgV3+cGM4tKKmI+ohlIGnygKX00rSBfszz/n2uXv81wd6+rt1orsZCHRdr1Imk2F2Kob3hutSxW8thsd8AXNaln9D7CTfA6O+0UgkMuwVvEFFUbbAcrkcTA8+AtOk8E6KiQiDmMFSDqZItAzEVQviRkdDdaFgPp8HSZKAEAL5Qh7Sq2lIJBJwv2scUqkUnKoZgNhcDKhKg5aH+1IkcouCAdFGAQsuWZYhOjwFHQ96oagWgRoUov1T9kRBEODAwxM2QtEUl+Wp+Ln9VRo6BcMw4ErHRYjH4/B26AlQoQQTRdHWwcd9AH57+UAXddvDD37DmrBBV34WfqiXPl61g+vr6xA9zsGeM9gOdsNXkgpEtTwVvwOklXLKm6+/p5ezwk4B+j6droBs2CsGa/gNs6RIxazl4Tc25mpTgw/apPR1LYlNRFAzgsOxkyXYLIM1V8NMwyAkJSctD1eGVKiq5wWjSPdjmeTkiKvVW4f2YPHWl3GAVq6ymcyCTgovM3FzyRiDe2TaKcEKsLpJvNHjZgPNqEtyi6mZIm4SRFyLMUsONSSdkPeFtY1n0mczoY3BHTLhwPRy9/lzcziCw9ACI+yql0VLzcGAZbYSM5CCSZg1/9oc/nn7+i8N9p/8An4JMADxhH+xHfuiKwAAAABJRU5ErkJggg==)"
            },
        }
    });

    $('#myConnectionsTab').on('click', function() {
        $.ajax({
            url: '/main/my-connections',
            success: function(data) {
                window.location.assign("/main/my-connections");
            }
        });

    });

    $('#searchTab').on('click', function() {
        $.ajax({
            url: '/main/search',
            success: function(data) {
                window.location.assign("/main/search");
            }
        });
    });

    $('#exploreTab').on('click', function() {
        $.ajax({
            url: '/main/explore',
            success: function(data) {
                window.location.assign("/main/explore");
            }
        });
    });

    $('#settingsTab').on('click', function() {
        var email = $('#userEmail').text();
        email = email.substring(10);
        $.ajax({
            url: '/users/settings/' + email,
            success: function(data) {
                window.location.assign("/users/settings/" + email);
            }
        });
    });

    $('#homeTab').on('click', function() {
        $.ajax({
            url: '/main',
            success: function(data) {
                window.location.assign("/main");
            }
        });
    });

    $('#logoutBtn').on('click', function() {
        $.ajax({
            url: '../../users/logout',
            success: function(data) {
                window.location.assign("/");
            }
        });
    });

    $('#cancelEdits').on('click', function() {
        var email = $('#userEmail').text();
        email = email.substring(10);
        $.ajax({
            url: '/users/settings/' + email,
            success: function(data) {
                window.location.assign("/users/settings/" + email);
            }
        });
    });

    //course major picker
    $('#addAll').click(function() {
        // move all values from #allCourses to #yourCourses
        var allCourses = document.getElementById('allCourses').options;
        var yourCourses = document.getElementById('yourCourses');
        for (i = 0; i < allCourses.length; i++) {
            var option = document.createElement('option');
            option.value = allCourses[i].value;
            option.innerHTML = allCourses[i].text;
            yourCourses.appendChild(option);
        }
        $('#allCourses').find('option').remove();

    });

    $('#addSome').click(function() {
        // move selected values from #allCourses to #yourCourses
        var allCourses = document.getElementById('allCourses');
        var yourCourses = document.getElementById('yourCourses');
        for (i = 0; i < allCourses.options.length; i++) {
            var option = allCourses.options[i];
            if (option.selected) {
                var newOption = document.createElement('option');
                newOption.value = option.value;
                newOption.innerHTML = option.text;
                yourCourses.appendChild(newOption);
            }
        }
        $('#allCourses :selected').remove();
    });

    $('#removeSome').click(function() {
        // move selected values from #allCourses to #yourCourses
        var allCourses = document.getElementById('allCourses');
        var yourCourses = document.getElementById('yourCourses');
        for (i = 0; i < yourCourses.options.length; i++) {
            var option = yourCourses.options[i];
            if (option.selected) {
                var newOption = document.createElement('option');
                newOption.value = option.value;
                newOption.innerHTML = option.text;
                allCourses.appendChild(newOption);
            }
        }
        $('#yourCourses :selected').remove();
    });

    $('#removeAll').click(function() {
        // move all values from #yourCourses to #allCourses
        var allCourses = document.getElementById('allCourses');
        var yourCourses = document.getElementById('yourCourses').options;
        for (i = 0; i < yourCourses.length; i++) {
            var option = document.createElement('option');
            option.value = yourCourses[i].value;
            option.innerHTML = yourCourses[i].text;
            allCourses.appendChild(option);
        }
        $('#yourCourses').find('option').remove();
    });

    $('.moveCourse').click(function() {
        var yourCourses = document.getElementById('yourCourses');
        var concatCourses = ""
        for (i = 0; i < yourCourses.options.length; i++) {
            concatCourses += yourCourses.options[i].text + ',';
        }
        document.getElementById('selectedCourses').value = concatCourses.substring(0, concatCourses.length - 1);

        var allCourses = $('#allCourses option')
        allCourses.sort(function(a, b) {
            return a.value - b.value;
        })
        $('#allCourses').html(allCourses);

        var yourCourses = $('#yourCourses option')
        yourCourses.sort(function(a, b) {
            return a.value - b.value;
        })
        $('#yourCourses').html(yourCourses);
    });

    if ($('body').is('.editableProfile')) {
        var checkedMajors = $('#majors').text().split(',');
        var yourCourses = document.getElementById('yourCourses');
        var allCourses = document.getElementById('allCourses');
        for (i = 0; i < allCourses.options.length; i++) {
            for (j = 0; j < checkedMajors.length; j++) {
                if (allCourses.options[i].text == checkedMajors[j]) {
                    var option = document.createElement('option');
                    option.value = allCourses.options[i].value;
                    option.innerHTML = allCourses.options[i].text;
                    yourCourses.appendChild(option);
                    allCourses.options[i].selected = true;
                }
            }
        }
        $('#allCourses :selected').remove();

        var concatCourses = ""
        for (i = 0; i < yourCourses.options.length; i++) {
            concatCourses += yourCourses.options[i].text + ',';
        }
        document.getElementById('selectedCourses').value = concatCourses.substring(0, concatCourses.length - 1);
    } // end if


    if ($('body').is('.search')) {
        var availableTags1 = [
            '2021',
            '2020',
            '2019',
            '2018',
            '2017',
            '2016',
            '2015',
            '2014',
            '2013',
            "2012",
            '2011',
            '2010',
            '2009',
            '2008',
            '2007',
            '2006',
            '2005',
            '2004',
            '2003',
            '2002',
            '2001',
            '2000',
            '1999',
            '1998',
            '1997',
            '1996',
            '1995',
            '1994',
            '1993',
            '1992',
            '1991',
            '1990',
            '1989',
            '1988',
            '1987',
            '1986',
            '1985',
            '1984',
            '1983',
            '1982',
            '1981',
            '1980',
            '1979',
            '1978',
            '1977',
            '1976',
            '1975',
            '1974',
            '1973',
            '1972',
            '1971',
            '1970',
            '1969',
            '1968',
            '1967',
            '1966',
            '1965',
            '1964',
            '1963',
            '1962',
            '1961',
            '1960',
            '1959',
            '1958',
            '1957',
            '1956',
            '1955',
            '1954',
            '1953',
            '1952',
            '1951',
            '1950',
            '1949',
            '1948',
            '1947',
            '1946',
            '1945',
            '1944',
            '1943',
            '1942',
            '1941',
            '1940'
        ];

        function split(val) {
            return val.split(/,\s*/);
        }

        function extractLast(term) {
            return split(term).pop();
        }

        $("#years")
            // don't navigate away from the field on tab when selecting an item
            .on("keydown", function(event) {
                if (event.keyCode === $.ui.keyCode.TAB &&
                    $(this).autocomplete("instance").menu.active) {
                    event.preventDefault();
                }
            })
            .autocomplete({
                minLength: 0,
                source: function(request, response) {
                    // delegate back to autocomplete, but extract the last term
                    response($.ui.autocomplete.filter(
                        availableTags1, extractLast(request.term)));
                },
                focus: function() {
                    // prevent value inserted on focus
                    return false;
                },
                select: function(event, ui) {
                    var terms = split(this.value);
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push(ui.item.value);
                    // add placeholder to get the comma-and-space at the end
                    terms.push("");
                    this.value = terms.join(", ");
                    return false;
                }
            });
    }

    if ($('body').is('.search')) {
        var availableTags2 = [
            'Undecided',
            'Course 1: Civil and Environmental Engineering',
            'Course 2: Mechanical Engineering',
            'Course 3: Materials Science and Engineering',
            'Course 4: Architecture',
            'Course 5: Chemistry',
            'Course 6: Electrical Engineering and Computer Science',
            'Course 7: Biology',
            'Course 8: Physics',
            'Course 9: Brain and Cognitive Sciences',
            'Course 10: Chemical Engineering',
            'Course 11: Urban Studies and Planning',
            'Course 12: Earth, Atmospheric, and Planetary Sciences',
            'Course 14: Economics',
            'Course 15: Management',
            'Course 16: Aeronautics and Astronautics',
            'Course 17: Political Science',
            'Course 18: Mathematics',
            'Course 20: Biological Engineering',
            'Course 21: Humanities',
            'Course 21A: Anthropology',
            'Course 21H: History',
            'Course 21G: Glocal Studies and Languages',
            'Course 21L: Literature',
            'Course 21M: Music and Theater Arts',
            'Course 21W: Comparative Media Studies/Writing',
            'Course 22: Nuclear Science and Engineering',
            'Course 24: Linguistics and Philosophy'
        ];

        function split(val) {
            return val.split(/,\s*/);
        }

        function extractLast(term) {
            return split(term).pop();
        }

        $("#courses")
            // don't navigate away from the field on tab when selecting an item
            .on("keydown", function(event) {
                if (event.keyCode === $.ui.keyCode.TAB &&
                    $(this).autocomplete("instance").menu.active) {
                    event.preventDefault();
                }
            })
            .autocomplete({
                minLength: 0,
                source: function(request, response) {
                    // delegate back to autocomplete, but extract the last term
                    response($.ui.autocomplete.filter(
                        availableTags2, extractLast(request.term)));
                },
                focus: function() {
                    // prevent value inserted on focus
                    return false;
                },
                select: function(event, ui) {
                    var terms = split(this.value);
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push(ui.item.value);
                    // add placeholder to get the comma-and-space at the end
                    terms.push("");
                    this.value = terms.join(", ");
                    return false;
                }
            });
    }


    if ($('body').is('.search')) {

        var availableTags3 = [
            "Alpha Delta Phi",
            "Alpha Epsilon Pi",
            "Chi Phi",
            "Delta Kappa Epsilon",
            "Delta Tau Delta",
            "Delta Upsilon",
            "Kappa Sigma",
            "Lambda Chi Alpha",
            "Nu Delta",
            "No. Six",
            "Phi Beta Epsilon",
            "Phi Delta Theta",
            "Phi Kappa Sigma",
            "Phi Kappa Theta",
            "Phi Sigma Kappa",
            "Pi Lambda Phi",
            "Sigma Alpha Epsilon",
            "Sigma Chi",
            "Sigma Nu",
            "Sigma Phi Epsilon",
            "Tau Epsilon Phi",
            "Theta Chi",
            "Theta Delta Chi",
            "Theta Xi",
            "Zeta Beta Tau",
            "Zeta Psi",
            "Alpha Chi Omega",
            "Alpha Epsilon Phi",
            "Alpha Phi",
            "Delta Phi Epsilon",
            "Kappa Alpha Theta",
            "Pi Beta Phi",
            "Sigma Kappa",

            "Baseball",
            "Basketball",
            "Crew",
            "Cross Country",
            "Fencing",
            "Field Hockey",
            "Football",
            "Lacrosse",
            "Rifle",
            "Sailing",
            "Soccer",
            "Softball",
            "Squash",
            "Swimming and Diving",
            "Tennis",
            "Track and Field",
            "Volleyball",
            "Water Polo",

            "Society of Women Engineers",
            "Tau Beta Pi",

            "Ballroom Dance",
            "Dance Troupe",
            "A capella",
            "MIT Symphony Orchestra",
            "Marching Band",
            "Theater",
            "Jazz Ensemble",

            "The Tech",
            "Technique",

            "UA",
            "Class Council",

            "ROTC",
            "SaveTFP",
            "GlobeMed",
            "Amphibious Achievement",
            "TechX",
            "Panhel",
            "IFC",
            "MedLinks",
            "LGBT",
            "Fossil Free"
        ];

        function split(val) {
            return val.split(/,\s*/);
        }

        function extractLast(term) {
            return split(term).pop();
        }

        $("#activities")
            // don't navigate away from the field on tab when selecting an item
            .on("keydown", function(event) {
                if (event.keyCode === $.ui.keyCode.TAB &&
                    $(this).autocomplete("instance").menu.active) {
                    event.preventDefault();
                }
            })
            .autocomplete({
                minLength: 0,
                source: function(request, response) {
                    // delegate back to autocomplete, but extract the last term
                    response($.ui.autocomplete.filter(
                        availableTags3, extractLast(request.term)));
                },
                focus: function() {
                    // prevent value inserted on focus
                    return false;
                },
                select: function(event, ui) {
                    var terms = split(this.value);
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push(ui.item.value);
                    // add placeholder to get the comma-and-space at the end
                    terms.push("");
                    this.value = terms.join(", ");
                    return false;
                }
            });
    }

    $('#ignoreBtn').on("click", function() {
        $.ajax({
            url: '/main/explore',
            success: function(data) {
                window.location.assign("/main/explore");
            }
        });
    });

    $('#connectBtn').on('click', function() {
        localStorage.setItem('connectButton', $('h2').attr('name'));
        // localStorage.setItem('connectButton', this.parentElement.childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].textContent);
        var email = $('#connectBtn').attr('class').split(" ")[2];
        $.ajax({
            url: '/users/connect/' + email,
            email: email,
            type: 'PUT',
            success: function(data) {
                window.location.assign("/main/explore");
                localStorage.setItem('connectNotification', true);
            }
        });
    });

    if (localStorage.getItem('connectNotification') == "true" && $('body').is('.explore')) {
        $.notify("Successfully connected with " + localStorage.getItem('connectButton'), {
            style: "connected"
        });
        localStorage.setItem('connectNotification', false);
        localStorage.setItem('connectButton', '');
    }

    $('#search-button').on('click', function() {
        var searchTerm = $('#search-bar').val() != '' ? $('#search-bar').val() : undefined;
        var yearFilter = $('#years').val() != '' ? $('#years').val() : undefined;
        var courseFilter = $('#courses').val() != '' ? $('#courses').val() : undefined;
        var activityFilter = $('#activities').val() != '' ? $('#activities').val() : undefined;
        // console.log(activityFilter.indexOf(" "));
        $.ajax({
            url: '/main/search/' + searchTerm + '/' + yearFilter + '/' + courseFilter + '/' + activityFilter,
            "searchTerm": searchTerm,
            "yearFilter": yearFilter,
            "courseFilter": courseFilter,
            "activityFilter": activityFilter,
            success: function(data) {
                window.location.assign('/main/search/' + searchTerm + '/' + yearFilter + '/' + courseFilter + '/' + activityFilter);
            }
        });
    });

    $('#search-bar').on('keydown', function(e) {
        if (e.which == 13) {
            var searchTerm = $('#search-bar').val() != '' ? $('#search-bar').val() : undefined;
            var yearFilter = $('#years').val() != '' ? $('#years').val() : undefined;
            var courseFilter = $('#courses').val() != '' ? $('#courses').val() : undefined;
            var activityFilter = $('#activities').val() != '' ? $('#activities').val() : undefined;
            $.ajax({
                url: '/main/search/' + searchTerm + '/' + yearFilter + '/' + courseFilter + '/' + activityFilter,
                "searchTerm": searchTerm,
                "yearFilter": yearFilter,
                "courseFilter": courseFilter,
                "activityFilter": activityFilter,
                success: function(data) {
                    window.location.assign('/main/search/' + searchTerm + '/' + yearFilter + '/' + courseFilter + '/' + activityFilter);
                }
            });
        }
    });

    if ($('body').is('.search') && $('.connectOrDisconnect')[0] != undefined) {
        $.ajax({
            url: "/main/connections",
            success: function(data) {
                $('.connectOrDisconnect').each(function() {
                    connections = data;
                    if (connections.indexOf(this.className.split(" ")[3]) > -1) {
                        if (this.className.split(" ")[3] == connections[connections.length - 1]) {
                            this.value = 'you';
                        } else {
                            this.value = 'disconnect';
                            this.style.visibility = 'visible';
                        }
                    } else {
                        this.value = 'connect';
                        this.style.visibility = 'visible';
                    }
                });
            }
        });
    }

    $('.connectOrDisconnect').on('click', function() {
        var currentButton = this;
        if (this.value == 'connect') {
            var email = this.className.split(" ")[3];
            $.ajax({
                url: '/users/connect/' + email,
                email: email,
                type: 'PUT',
                success: function(data) {
                    currentButton.value = 'disconnect';
                    $.notify("Successfully connected with " + $('#notifName').attr('name'), {
                        style: "connected"
                    });
                }
            });
        } else if (this.value == 'disconnect') {
            var email = this.className.split(" ")[3];
            $.ajax({
                url: '/users/disconnect/' + email,
                email: email,
                type: 'PUT',
                success: function(data) {
                    currentButton.value = 'connect';
                    $.notify("Successfully disconnected from " + $('#notifName').attr('name'), {
                        style: "connected"
                    });
                }
            });
        }
    });

    if ($('body').is('.viewProfilePage') && $('.disconnectProfile')[0] != undefined) {
        console.log($('.disconnectProfile')[0].className.split(" "));
        $.ajax({
            url: "/main/connections",
            success: function(data) {
                connections = data;
                var button = $('.disconnectProfile')[0];
                if (connections.indexOf(button.className.split(" ")[2]) > -1 && button.className.split(" ")[2] != connections[connections.length - 1]) {
                    button.value = 'disconnect';
                } else {
                    button.value = 'connect';
                }
            }
        });
    }

    $('.disconnectProfile').on('click', function() {
        var currentButton = this;
        if (this.value == 'connect') {
            var email = this.className.split(" ")[2];
            $.ajax({
                url: '/users/connect/' + email,
                email: email,
                type: 'PUT',
                success: function(data) {
                    currentButton.value = 'disconnect';
                    $.notify("Successfully connected with " + $('.disconnectProfile').attr('name'), {
                        style: "connected"
                    });
                }
            });
        } else if (this.value == 'disconnect') {
            var email = this.className.split(" ")[2];
            $.ajax({
                url: '/users/disconnect/' + email,
                email: email,
                type: 'PUT',
                success: function(data) {
                    currentButton.value = 'connect';
                    $.notify("Successfully disconnected from " + $('.disconnectProfile').attr('name'), {
                        style: "connected"
                    });
                }
            });
        }
    });

    $('#saveProfile', this).click(function() {
        var email = $('#userEmail').text();
        email = email.substring(10);
        console.log($('#address').text())
        $.ajax({
            url: "/users/edit-profile/" + email,
            type: 'PUT',
            data: {
                "phoneNumber": $('#phoneNumber').val(),
                "course": $('#selectedCourses').val().trim().replace(/<(.|\n)*?>/g, ''),
                "gradYear": $('#gradYear').find(":selected").text(),
                "address": $('#pac-input').val(),
                "workLoc": $('#workLocation').val(),
                "workPosition": $('#workPosition').val()
            },
            success: function(data) {
                window.location.assign("/users/settings/" + email);
            },
            error: function(data) {
                alert("An error has occurred. Please try again.");
            }

        });
    }); // end profile update

    $('.sendMessage').on('click', function(){
    	var email = $(this).attr('class').split(" ")[2];
        window.location.href = "mailto:" + email + "?subject=[connectMIT]";
    });

    $('.viewProfile').on('click', function() {
        var email = this.className.split(" ")[2];
        // should this be in main or users?
        $.ajax({
            url: '/users/viewProfile/' + email,
            email: email,
            success: function(data) {
                window.location.assign("/users/viewProfile/" + email);
            }
        });
    });

    $('.disconnect').on('click', function() {
        var email = this.className.split(" ")[3];
        localStorage.setItem('disconnectButton', this.parentElement.childNodes[0].textContent);
        $.ajax({
            url: '/users/disconnect/' + email,
            email: email,
            type: 'PUT',
            success: function(data) {
                window.location.assign("/main/my-connections");
                localStorage.setItem('disconnectNotification', true);
            }
        });
    });

    if (localStorage.getItem('disconnectNotification') == "true" && $('body').is('.my-connections')) {
        $.notify("Successfully disconnected from " + localStorage.getItem('disconnectButton'), {
            style: "connected"
        });
        localStorage.setItem('disconnectNotification', false);
        localStorage.setItem('disconnectButton', '');
    }

});


function initMap() {
    var map = new google.maps.Map(document.getElementById('map_registration'), {
        center: {
            lat: 42.3601,
            lng: -71.0942
        },
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        scrollwheel: false
    });
    var input = /** @type {!HTMLInputElement} */ (
        document.getElementById('pac-input'));
    var old_location = $('#old_location').text();
    if (old_location) {
        $('#pac-input').val(old_location)
    }


    var types = document.getElementById('type-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(16); // Why 16? Because it looks good.
        }
        marker.setIcon( /** @type {google.maps.Icon} */ ({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);

    });
}