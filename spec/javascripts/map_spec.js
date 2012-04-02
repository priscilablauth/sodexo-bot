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
		var expectedLocation = new google.maps.LatLng(coords.latitude, coords.longitude);
		expect(map.setCenter).toHaveBeenCalledWith(expectedLocation);
	});

	it("pins the user location on the map", function(){
		var pinOptions = {
			map: map,
			draggable: true,
			animation: google.maps.Animation.DROP,
			position: new google.maps.LatLng(coords.latitude, coords.longitude),
			title: 'Sua Localização'
		};
		var calledWithCorrectArguments = Mocks.fakeMarkerToExpect(pinOptions);
 		var sodexo = Sodexo(map);
		expect(calledWithCorrectArguments()).toBeTruthy();
	});

	it("fetches the closest venues which accepts sodexo", function(){
		var silva = Venue('Silva', { latitude: 10, longitude: 15 } );
		var service = Mocks.venueService([silva]);

		var pinOptions = {
			map: map,
			draggable: false,
			animation: google.maps.Animation.DROP,
			position: silva.latLng,
			title: silva.name
		};

		var sodexo = Sodexo(map, service);
		var pinnedSilva = Mocks.fakeMarkerToExpect(pinOptions);
		sodexo.fetch();
		expect(pinnedSilva()).toBeTruthy();
	});

  it('calls the service with the current location', function(){
    var silva = Venue('Silva', { latitude: 10, longitude: 15 } );
    var service = Mocks.venueService([silva]);
    spyOn(service, 'near');
    var sodexo = Sodexo(map, service);
    sodexo.fetch();
    var params = { position: coords, radius: 10 };
    var serverParams = service.near.mostRecentCall.args[0];
    expect(params).toEqual(serverParams);
  });
});
