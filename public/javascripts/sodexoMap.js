Sodexo.Map = function(map, service, loadedCallback){
	var api = {};
  api.currentLocation = {};
  var venues = [];

	var load = function(){
		navigator.geolocation.getCurrentPosition(initMap);
	};

	var initMap = function(position){
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		var latLng = new google.maps.LatLng(lat, lng);
		map.setCenter(latLng);
		pinUserLocation(latLng);
    loadedCallback();
	};

	var pinUserLocation = function(latLng){
		api.currentLocation = new google.maps.Marker({
			map: map,
			draggable: true,
			animation: google.maps.Animation.DROP,
			position: latLng,
			title: 'Sua Localização'
		});
	};

	var pinVenue = function(venue){
		var venue = new google.maps.Marker({
			map: map,
			draggable: false,
			animation: google.maps.Animation.DROP,
			position: venue.latLng,
			title: venue.name,
      icon: '/images/restaurant.png'
		});
    venues.push(venue);
	};

  var currentPosition = function(){
    var position = api.currentLocation.position;
    return {
      latitude: position.Xa || position.Ta,
      longitude: position.Ya || position.Ua
    };
  };

  var cleanOldVenues = function(){
    _.each(venues, function(venue){
      venue.setMap(null);
    });
  };

	api.fetch = function(){
    var params = {
      position: currentPosition(),
      radius: 1
    };
		service.near(params, function(venues){
			_.each(venues, pinVenue);
		});
    cleanOldVenues();
	};
	load();

	return api;
};
