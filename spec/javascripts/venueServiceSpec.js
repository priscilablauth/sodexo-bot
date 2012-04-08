describe('fetching the venues from the server', function () {
    var service, params, callback, request, position;

    beforeEach(function () {
        spyOn($, 'ajax').andCallFake(function (options) {
            options.success(testResponses.venues());
        });
        callback = jasmine.createSpy('success');
        service = Sodexo.VenueService();
        position = new google.maps.LatLng(-10, -20);
        params = { position:{ latitude:position.lat(), longitude:position.lng() }, radius:1 };
        service.near(params, callback);
        request = $.ajax.mostRecentCall.args[0];
    });

    it('fetches the data based on the user location', function () {
        expect(request.url).toEqual('/near?radius=1&latitude=-10&longitude=-20');
    });

    it('parses the result into venues and passes it to the callback', function () {
        var panorama = Venue('Panorama 40 Lanch.', {latitude:-30.0611829, longitude:-51.1737907});
        var predio30 = Venue('Bar Do Predio 30', {latitude:-30.0611829, longitude:-51.1737907});
        expect(callback.mostRecentCall.args[0].venues).toEqual([panorama, predio30]);
    });

    it('sends the position back', function () {
        expect(callback.mostRecentCall.args[0].position).toEqual(position);
    });
});

describe('searching for the near venues using text address', function () {
    var service, params, request, address, callback;

    beforeEach(function () {
        spyOn($, 'ajax').andCallFake(function (options) {
            options.success(testResponses.venues());
        });

        google.maps.Geocoder = function(){
            this.geocode = function(params, callback){
                var result = [];
                var geometry = {
                    location: new google.maps.LatLng(-10, -20)
                };
                result.push({geometry: geometry});
                callback(result);
            };
        };

        service = Sodexo.VenueService();
        address = "Rua Artur Rocha, 669 - Porto Alegre - RS";
        params = { address: address, radius:1 };
        callback = jasmine.createSpy('success');
        service.near(params, callback);
        request = $.ajax.mostRecentCall.args[0];
    });

    it('geo-encodes the address into lat/lng before sending the request to the server', function () {
        var geoEncodedPosition = new google.maps.LatLng(-10, -20);
        expect(request.url).toEqual('/near?radius=' + params.radius + '&latitude=' + geoEncodedPosition.lat() + '&longitude=' + geoEncodedPosition.lng());
    });
});
