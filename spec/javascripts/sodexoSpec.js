describe('Sodexo.Page', function(){
  var dom, mapCanvas, theMap, theService, mockSodexoMap;

  beforeEach(function(){
    mapCanvas = $('</div>');
    dom = {
      mapCanvas: function(){ return mapCanvas; }
    };
   theMap = function(){};
    spyOn(google.maps, 'Map').andReturn(theMap);
    spyOn(Sodexo,'VenueService').andReturn(theService);
  });

  it('creates the map on the screen', function(){
    var options = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    spyOn(Sodexo, 'Map');
    var sodexo = Sodexo.Page(dom);
    expect(google.maps.Map).toHaveBeenCalledWith(mapCanvas, options);
  });

  it('creates the map controller with the service', function(){
    spyOn(Sodexo, 'Map');
    Sodexo.Page(dom);
    var usedMap = Sodexo.Map.mostRecentCall.args[0];
    var usedService = Sodexo.Map.mostRecentCall.args[1];
    expect(usedService).toBe(theService);
    expect(usedMap).toBe(theMap);
  });
});
