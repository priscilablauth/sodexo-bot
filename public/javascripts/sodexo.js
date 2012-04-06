var Sodexo = {};
Sodexo.Page = function(dom){
  var sodexoMap;

  var init = function(){
    var mapOptions = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(dom.mapCanvas(), mapOptions);
    var service = Sodexo.VenueService();
    sodexoMap = Sodexo.Map(map, service, onMapLoad);
  };

  var bindEvents = function(){
    google.maps.event.addListener(sodexoMap.currentLocation, 'dragend', sodexoMap.fetch);
  };

  var onMapLoad = function(){
    bindEvents();
    sodexoMap.fetch();
  };

  init();
};
