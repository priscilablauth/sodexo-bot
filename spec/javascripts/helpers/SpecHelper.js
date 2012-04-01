beforeEach(function() {
  this.addMatchers({});
});

var Mocks = {
	fakeCurrentPositionTo: function(coords){
		navigator.geolocation.getCurrentPosition = function(callback, error){
			callback({coords: coords});
		};
	}
};