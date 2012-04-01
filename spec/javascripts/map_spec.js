describe('SodexoMap', function(){
	var map, coords;
	
	beforeEach(function(){
		map = function(){
			return {
				setCenter: function(){}
			}
		}();	
		
		coords = { latitude: -10, longitude: -20 };
		Mocks.fakeCurrentPositionTo(coords);
		Mocks.fakeMarkerToExpect({});
	});
	
	it("centers it to the user's location", function(){	
		spyOn(map, 'setCenter');
		var sodexo = Sodexo(map);
		sodexo.load();
		var expectedLocation = new google.maps.LatLng(coords.latitude, coords.longitude);
		expect(map.setCenter).toHaveBeenCalledWith(expectedLocation);
	});
	
	it("pins the user location on the map", function(){
		var pinOptions = {
			map: map,
			draggable: true,
			animation: google.maps.Animation.DROP,
			position: coords
		};
		
		var calledWithCorrectArguments = Mocks.fakeMarkerToExpect(pinOptions);
		
 		var sodexo = Sodexo(map);
 		sodexo.load();
		expect(calledWithCorrectArguments()).toBeTruthy();
	});
});