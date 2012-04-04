var VenueService = function(){
  var api = {};

  api.near = function(params, callback){
    $.ajax({
      url: '/near?radius='+params.radius+'&latitude='+params.position.latitude+'&longitude='+params.position.longitude,
      success: function(data){
        var venues = _.map(data, toVenue);
        callback(venues);
      }
    });
  };

  var toVenue = function(rawVenue){
    rawVenue = rawVenue.venue;
    var address = rawVenue.address;
    var position = {latitude: address.latitude, longitude: address.longitude };
    return Venue(rawVenue.name, position);
  };

  return api;
};
