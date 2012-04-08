describe('Sodexo.Page', function () {
    var dom, mapCanvas, theMap, coords, service, venues, sodexoMap;

    beforeEach(function () {
        mapCanvas = $('</div>');
        var addressInput = $('</input>');
        var addressForm = $('<form></form>');
        dom = {
            mapCanvas:function () {
                return mapCanvas;
            },
            addressInput:function () {
                return addressInput;
            },
            addressForm:function () {
                return addressForm;
            }
        };
        theMap = function () {};
        coords = {latitude:10, longitude:10};
        Mocks.fakeCurrentPositionTo(coords);
        spyOn(google.maps, 'Map').andReturn(theMap);


        sodexoMap = function () {
            return{
                pinVenues:function () {},
                currentLocation:{},
                currentPosition:function () { return new google.maps.LatLng(15, 15); },
                pinUserLocationTo: function() { } ,
                updateUserLocation: function(){}
            };
        }();

        spyOn(Sodexo, 'Map').andReturn(sodexoMap);

        venues = [];
        service = Mocks.venueService(venues);
    });

    describe("when initializing the page", function () {
        it('creates the map on the screen and centers it to the users location', function () {
            var options = {
                zoom:14,
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
                radius:1,
                position:coords
            };
            expect(service.near).toHaveBeenCalledWith(params, Sodexo.Map().updateUserLocation);
        });
    });

    describe('when moving the pin around', function () {
        it('fetches the closest venues again', function () {
            Sodexo.Page(dom, service);
            spyOn(service, 'near');
            google.maps.event.trigger(sodexoMap.currentLocation, 'dragend');
            var newPosition = { latitude:sodexoMap.currentPosition().lat(), longitude:sodexoMap.currentPosition().lng() };
            var params = {
                radius:1,
                position:newPosition
            };
            expect(service.near).toHaveBeenCalledWith(params, Sodexo.Map().updateUserLocation);
        });
    });

    describe('changing the address with the text input', function () {
        var geocodedPosition, address, venues;
        beforeEach(function () {
            Sodexo.Page(dom, service);
            geocodedPosition = new google.maps.LatLng(20, 30);
            venues = [];
            spyOn(service, 'near').andCallFake(function(params, callback){
                callback({
                    position: geocodedPosition,
                    venues: venues
                })
            });
            spyOn(sodexoMap, 'pinUserLocationTo');
            spyOn(sodexoMap, 'pinVenues');
            address = 'Rua Artur Rocha, 669 - Porto Alegre - RS';
            dom.addressInput().value = address;
            dom.addressForm().trigger('submit');
        });
        it('updates the user location based on the address', function () {
            var params = {
                radius:1,
                address:address
            };
            expect(service.near).toHaveBeenCalledWith(params, sodexoMap.updateUserLocation);
        });
    });
});
