var Sodexo = function(map, service){
	var api = {};
	
	var load = function(){
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
			position: latLng,
			title: 'Sua Localização'
		});
	};
	
	var pinVenue = function(venue){
		new google.maps.Marker({
			map: map,
			draggable: false,
			animation: google.maps.Animation.DROP,
			position: venue.latLng(),
			title: venue.name()
		});
	};
	
	api.fetch = function(){
		service.near(function(venues){
			_.each(venues, pinVenue);
		});
	};
	
	load();
	
	return api;
};