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
            url: '../users/logout',
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



});