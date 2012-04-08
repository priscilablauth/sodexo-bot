Sodexo.Map = function (map, coords) {
    var api = {};
    var venues = [];

    var initMap = function (coords) {
        var lat = coords.latitude;
        var lng = coords.longitude;
        var latLng = new google.maps.LatLng(lat, lng);
        map.setCenter(latLng);
        api.pinUserLocationTo(latLng);
    };

    api.pinUserLocationTo = function (latLng) {
        if (api.currentLocation){
            api.currentLocation.setPosition(latLng);
            map.setCenter(latLng);
        }else{
            api.currentLocation = new google.maps.Marker({
                map:map,
                draggable:true,
                animation:google.maps.Animation.DROP,
                position:latLng,
                title:'Sua Localização'
            });
        }
    };

    api.pinVenues = function(venues){
        cleanOldVenues();
        _.each(venues, pinVenue);
    };

    api.updateUserLocation = function(result){
        api.pinVenues(result.venues);
        api.pinUserLocationTo(result.position);
    };

    var pinVenue = function (venue) {
        var venue = new google.maps.Marker({
            map:map,
            draggable:false,
            animation:google.maps.Animation.DROP,
            position:venue.latLng,
            title:venue.name,
            icon:'/images/restaurant.png'
        });
        venues.push(venue);
    };

    var cleanOldVenues = function () {
        _.each(venues, function (venue) {
            venue.setMap(null);
        });
    };

    api.currentPosition = function(){
        var position = api.currentLocation.position;
        var lat = position.Xa || position.Ta;
        var lng = position.Ya || position.Ua;
        return new google.maps.LatLng(lat, lng);
    };

    initMap(coords);

    return api;
};
