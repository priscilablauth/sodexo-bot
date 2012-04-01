var Venue = function(name, coords){
	return {
		name: function(){
			return name;
		},
		latLng: function(){
			new google.maps.LatLng(coords.latitude, coords.longitude);
		}
	};
};