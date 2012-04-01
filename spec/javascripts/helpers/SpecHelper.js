beforeEach(function() {
  this.addMatchers({});
});

var Mocks = {
	fakeCurrentPositionTo: function(coords){
		navigator.geolocation.getCurrentPosition = function(callback, error){
			callback({coords: coords});
		};
	},
	
	fakeMarkerToExpect: function(pinOptions){
		var called = false;
		google.maps.Marker = function(options){
			if (_.isEqual(options, pinOptions));
				called = true;
		};
		return function(){
			return called;
		};
	}
};