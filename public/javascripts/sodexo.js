var Sodexo = function(map, service){
	var api = {};
  var currentPosition;

	var load = function(){
		navigator.geolocation.getCurrentPosition(initMap);
	};

	var initMap = function(position){
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
    currentPosition = position.coords;
		var latLng = new google.maps.LatLng(lat, lng);
		map.setCenter(latLng);
		pinUserLocation(latLng);
		api.fetch();
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
			position: venue.latLng,
			title: venue.name
		});
	};

	api.fetch = function(){
    var params = {
      position: currentPosition,
      radius: 1
    };
		service.near(params, function(venues){
			_.each(venues, pinVenue);
		});
	};

	load();

	return api;
};
