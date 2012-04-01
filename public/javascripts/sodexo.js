var Sodexo = function(map){
	var api = {};
	
	api.load = function(){
		navigator.geolocation.getCurrentPosition(initMap);
	};
	
	var initMap = function(position){
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		var latLng = new google.maps.LatLng(lat, lng);
		map.setCenter(latLng);
		pinUserLocation(latLng);
	};
	
	var pinUserLocation = function(latLng){
		new google.maps.Marker({
			map: map,
			draggable: true,
			animation: google.maps.Animation.DROP,
			position: latLng
		});
	};
	
	return api;
};