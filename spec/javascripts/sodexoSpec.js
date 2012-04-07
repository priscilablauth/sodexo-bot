describe('Sodexo.Page', function () {
    var dom, mapCanvas, theMap, coords, service, venues, sodexoMap;

    beforeEach(function () {
        mapCanvas = $('</div>');
        var addressInput = $('</input>');
        dom = {
            mapCanvas:function () { return mapCanvas; },
            addressInput:function () { return addressInput; }
        };
        theMap = function () {};
        coords = {latitude:10, longitude:10};
        Mocks.fakeCurrentPositionTo(coords);
        spyOn(google.maps, 'Map').andReturn(theMap);


        sodexoMap = function(){
            return{
                pinVenues: function(){},
                currentLocation : {},
                currentPosition : function(){
                    return new google.maps.LatLng(15, 15);
                }
            };
        }();

        spyOn(Sodexo, 'Map').andReturn(sodexoMap);

        venues = [];
        service = Mocks.venueService(venues);
    });

    describe("when initializing the page", function () {
        it('creates the map on the screen and centers it to the users location', function () {
            var options = {
                zoom:15,
                mapTypeId:google.maps.MapTypeId.ROADMAP,
                center:new google.maps.LatLng(coords.latitude, coords.longitude)
            };
            Sodexo.Page(dom, service);
            expect(google.maps.Map).toHaveBeenCalledWith(mapCanvas, options);
        });

        it('initializes the Sodexo.Map', function () {
            Sodexo.Page(dom, service);
            expect(Sodexo.Map).toHaveBeenCalledWith(theMap, coords);
        });

        it('fecthes the closest venues which accept sodexo', function () {
            spyOn(service, 'near');
            Sodexo.Page(dom, service);
            var params = {
                position:coords,
                radius:1
            };
            expect(service.near).toHaveBeenCalledWith(params, Sodexo.Map().pinVenues);
        });
    });

    describe('when moving the pin around', function () {
        it('fetches the closest venues again', function () {
            Sodexo.Page(dom, service);
            spyOn(service, 'near');
            google.maps.event.trigger(sodexoMap.currentLocation, 'dragend');
            var newPosition = { latitude: sodexoMap.currentPosition().lat(), longitude: sodexoMap.currentPosition().lng() };
            var params = {
                radius: 1,
                position: newPosition
            };
            expect(service.near).toHaveBeenCalledWith(params, Sodexo.Map().pinVenues);
        });
    });
});
