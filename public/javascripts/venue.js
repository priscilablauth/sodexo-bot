var Venue = function(name, coords){
  var latLng =  new google.maps.LatLng(coords.latitude, coords.longitude); new google.maps.LatLng(coords.latitude, coords.longitude);
	return {
    name: name,
    latLng: latLng
	};
};
