describe('SodexoMap', function(){
	var map;
	
	beforeEach(function(){
		map = function(){
			return {
				setCenter: function(){}
			}
		}();	
	});
	
	it("centers it to the user's location", function(){	
		Mocks.fakeCurrentPositionTo({ latitude: -10, longitude: -20 });
		spyOn(map, 'setCenter')
		
		var sodexo = Sodexo(map);
		sodexo.load();
		expect(map.setCenter).toHaveBeenCalledWith(new google.maps.LatLng(-10, -20));
	});
});