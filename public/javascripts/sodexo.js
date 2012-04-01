var Sodexo = function(map){
	var api = {};
	
	api.load = function(){
		navigator.geolocation.getCurrentPosition(panMapTo);
	};
	
	var panMapTo = function(position){
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		var latLng = new google.maps.LatLng(lat, lng);
		map.setCenter(latLng);
	}
	
	return api;
};