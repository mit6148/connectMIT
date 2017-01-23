$(function(){

	$('#myConnectionsTab').on('click', function (){
		$.ajax({
            url: '/main/my-connections',
            success: function(data) {
                window.location.assign("/main/my-connections");
            }
        });

	});

	$('#searchTab').on('click', function(){
		$.ajax({
            url: '/main/search',
            success: function(data) {
                window.location.assign("/main/search");
            }
        });
	});

	$('#exploreTab').on('click', function(){
		$.ajax({
            url: '/main/explore',
            success: function(data) {
                window.location.assign("/main/explore");
            }
        });
	});

	$('#settingsTab').on('click', function(){
		var email = $('#userEmail').text();
		email = email.substring(10);
		$.ajax({
            url: '/users/settings/' + email,
            success: function(data) {
                window.location.assign("/users/settings/" + email);
            }
        });
	});

	$('#homeTab').on('click', function(){
		$.ajax({
            url: '/main/my-connections',
            success: function(data) {
                window.location.assign("/main/my-connections");
            }
        });
	});

	$('#logoutBtn').on('click', function(){
		$.ajax({
            url: '../../users/logout',
            success: function(data) {
                window.location.assign("/");
            }
        });
	});

	$('#cancelEdits').on('click', function(){
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

});