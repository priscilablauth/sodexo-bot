Sodexo.VenueService = function () {
    var api = {};

    api.near = function (params, callback) {
        params.position ? fetch(params, callback) : geocodeAndFetch(params, callback);
    };

    var geocodeAndFetch = function(params, callback){
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: params.address}, function(result){
            var location = result[0].geometry.location;
            params.position = {
                latitude: location.lat(),
                longitude: location.lng()
            };
            fetch(params, callback);
        });
    };

    var fetch = function(params, callback){
        $.ajax({
            url:'/near?radius=' + params.radius + '&latitude=' + params.position.latitude + '&longitude=' + params.position.longitude,
            success:function (data) {
                var venues = _.map(data, toVenue);
                callback({venues: venues, position: new google.maps.LatLng(params.position.latitude, params.position.longitude)});
            }
        });
    };

    var toVenue = function (rawVenue) {
        rawVenue = rawVenue.venue;
        var address = rawVenue.address;
        var position = {latitude:address.latitude, longitude:address.longitude };
        return Venue(rawVenue.name, position);
    };

    return api;
};
