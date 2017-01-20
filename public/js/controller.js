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
		$.ajax({
            url: '/main/settings',
            success: function(data) {
                window.location.assign("/main/settings");
            }
        });
	});

});