beforeEach(function() {
  this.addMatchers({});
});

var Mocks = function(){
	var api = {};
	
	api.venueService = function(results){
		var service = function(){
			return {
				near: function(callback){
					callback(results);
				}
			};
		}();
		return service;
	};
	
	api.fakeCurrentPositionTo = function(coords){
		navigator.geolocation.getCurrentPosition = function(callback, error){
			callback({coords: coords});
		};
	};
	
	api.fakeMarkerToExpect = function(pinOptions){
		var called = false;
		google.maps.Marker = function(options){
			if (_.isEqual(options, pinOptions)){
					called = true;
			}
		};
		return function(){
			return called;
		};
	};
	
	return api;
}();