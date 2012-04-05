describe('SodexoMapMap', function(){
	var map, coords, service, silva, service;

	beforeEach(function(){
		map = function(){
			return {
				setCenter: function(){}
			}
		}();

    silva = Venue('Silva', { latitude: 10, longitude: 15 } );
		service = Mocks.venueService([silva]);

		coords = { latitude: -10, longitude: -20 };
		Mocks.fakeCurrentPositionTo(coords);
		Mocks.fakeMarkerToExpect({});
	});

	it("centers it to the user's location", function(){
		spyOn(map, 'setCenter');
		var sodexoMap = SodexoMap(map, service);
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
 		var sodexoMap = SodexoMap(map, service);
		expect(calledWithCorrectArguments()).toBeTruthy();
	});

  it("fetches the closest venues which accepts sodexoMap", function(){
    var pinOptions = {
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: silva.latLng,
      title: silva.name,
      icon: '/images/restaurant.png'
    };

		var sodexoMap = SodexoMap(map, service);
		var pinnedSilva = Mocks.fakeMarkerToExpect(pinOptions);
		sodexoMap.fetch();
		expect(pinnedSilva()).toBeTruthy();
	});

  it('calls the service with the current location', function(){
    var silva = Venue('Silva', { latitude: 10, longitude: 15 } );
    var service = Mocks.venueService([silva]);
    spyOn(service, 'near');
    var sodexoMap = SodexoMap(map, service);
    sodexoMap.fetch();
    var params = { position: coords, radius: 1 };
    var serverParams = service.near.mostRecentCall.args[0];
    expect(params).toEqual(serverParams);
  });


  describe('moving the pin around', function(){
    it('fetches new venues from the server', function(){
      var currentLocation = new google.maps.Marker({});
      google.maps.Marker = function(){
        return currentLocation;
      };
      var sodexoMap = SodexoMap(map, service);
      google.maps.event.trigger(currentLocation, 'dragend');
    });
  });
});
