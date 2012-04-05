describe('Sodexo.Map', function(){
  var map, coords, service, silva, service, loadedCallback;

  beforeEach(function(){
    map = function(){
      return {
        setCenter: function(){}
      }
    }();

    loadedCallback = jasmine.createSpy('loaded');
    silva = Venue('Silva', { latitude: 10, longitude: 15 } );
    service = Mocks.venueService([silva]);

    coords = { latitude: -10, longitude: -20 };
    Mocks.fakeCurrentPositionTo(coords);
    Mocks.fakeMarkerToExpect({});
  });

  it("centers it to the user's location", function(){
    spyOn(map, 'setCenter');
    var sodexoMap = Sodexo.Map(map, service, loadedCallback);
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
    var sodexoMap = Sodexo.Map(map, service, loadedCallback);
    expect(calledWithCorrectArguments()).toBeTruthy();
  });

  it("fetches the closest venues which accept sodexoMap", function(){
    var pinOptions = {
      map: map,
    draggable: false,
    animation: google.maps.Animation.DROP,
    position: silva.latLng,
    title: silva.name,
    icon: '/images/restaurant.png'
    };

    var sodexoMap = Sodexo.Map(map, service, loadedCallback);
    var pinnedSilva = Mocks.fakeMarkerToExpect(pinOptions);
    sodexoMap.fetch();
    expect(pinnedSilva()).toBeTruthy();
  });

  it('calls the service with the current location', function(){
    var silva = Venue('Silva', { latitude: 10, longitude: 15 } );
    var service = Mocks.venueService([silva]);
    spyOn(service, 'near');
    var sodexoMap = Sodexo.Map(map, service, loadedCallback);
    sodexoMap.fetch();
    var params = { position: coords, radius: 1 };
    var serverParams = service.near.mostRecentCall.args[0];
    expect(params).toEqual(serverParams);
  });

  it('calls the loadedCallBack after pinning the user location', function(){
    var sodexoMap = Sodexo.Map(map, service, loadedCallback);
    expect(loadedCallback).toHaveBeenCalled();
  });

});
