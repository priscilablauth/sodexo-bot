describe('Sodexo.Map', function () {
    var map, coords;

    beforeEach(function () {
        map = function () {
            return {
                setCenter:function () {
                }
            }
        }();

        coords = { latitude:-10, longitude:-20 };
    });

    it("centers it to the user's location", function () {
        Mocks.fakeMarkerToExpect({});
        spyOn(map, 'setCenter');
        Sodexo.Map(map, coords);
        var expectedLocation = new google.maps.LatLng(coords.latitude, coords.longitude);
        expect(map.setCenter).toHaveBeenCalledWith(expectedLocation);
    });

    it("pins the user location on the map", function () {
        var pinOptions = {
            map:map,
            draggable:true,
            animation:google.maps.Animation.DROP,
            position:new google.maps.LatLng(coords.latitude, coords.longitude),
            title:'Sua Localização'
        };
        var calledWithCorrectArguments = Mocks.fakeMarkerToExpect(pinOptions);
        Sodexo.Map(map, coords);
        expect(calledWithCorrectArguments()).toBeTruthy();
    });

    it('returns its current position based on its location', function () {
        var sodexoMap = Sodexo.Map(map, coords);
        var position = sodexoMap.currentPosition();
        expect(position).toEqual(new google.maps.LatLng(coords.latitude, coords.longitude));
    });

    describe('pinning the users location around', function () {
        it('sets the maps center to the position', function () {
            var position = new google.maps.LatLng(-20, -15);
            var positionChanged = false;
            google.maps.Marker = function(){
                this.setPosition = function(passedPosition){
                    if (_.isEqual(position, passedPosition))
                        positionChanged = true;
                };
            };
            spyOn(map, 'setCenter');
            var sodexoMap = Sodexo.Map(map, coords);
            sodexoMap.pinUserLocationTo(position);
            expect(positionChanged).toBeTruthy();
            expect(map.setCenter).toHaveBeenCalledWith(position);
        });
    });
});
