describe('fetching the venues from the server', function(){
  var service, params, callback, request;

  beforeEach(function(){
    spyOn($, 'ajax').andCallFake(function(options){
      options.success(testResponses.venues());
    });
    callback = jasmine.createSpy('success');
    service = Sodexo.VenueService();
    var position = new google.maps.LatLng(-10, -20);
    params = { position: { latitude: position.lat(), longitude: position.lng() } , radius: 1 } ;
    service.near(params, callback);
    request = $.ajax.mostRecentCall.args[0];
  });

  it('fetches the data based on the user location', function(){
    expect(request.url).toEqual('/near?radius=1&latitude=-10&longitude=-20');
  });

  it('parses the result into venues and passes it to the callback', function(){
    var panorama = Venue('Panorama 40 Lanch.', {latitude: -30.0611829, longitude: -51.1737907});
    var predio30 = Venue('Bar Do Predio 30', {latitude: -30.0611829, longitude: -51.1737907});
    expect(callback).toHaveBeenCalledWith([panorama, predio30]);
  });
});
