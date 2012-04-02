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
    var address = rawVenue.address;
    var position = {latitude: address.coordinates[1], longitude: address.coordinates[0] };
    return Venue(rawVenue.name, position);
  };

  return api;
};
