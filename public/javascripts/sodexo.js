var Sodexo = {};
Sodexo.Page = function (dom, service) {
    var sodexoMap;

    var init = function () {
        navigator.geolocation.getCurrentPosition(createMap);
    };

    var createMap = function(location){
        var coords = location.coords;
        var center = new google.maps.LatLng(coords.latitude, coords.longitude);
        var mapOptions = {
            zoom:15,
            mapTypeId:google.maps.MapTypeId.ROADMAP,
            center: center
        };
        var map = new google.maps.Map(dom.mapCanvas(), mapOptions);
        sodexoMap = Sodexo.Map(map, coords);
        fetchVenues(coords);
        bindEvents();
    };

    var fetchVenues = function(coords){
        var params = {
            position: coords,
            radius: 1
        };
        service.near(params, sodexoMap.pinVenues);
    };

    var bindEvents = function(){
        google.maps.event.addListener(sodexoMap.currentLocation, 'dragend', function () {
            var coords = { latitude: sodexoMap.currentPosition().lat(), longitude: sodexoMap.currentPosition().lng() };
            fetchVenues(coords);
        });
    };

    init();
};
