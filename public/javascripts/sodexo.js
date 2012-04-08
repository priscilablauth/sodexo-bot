var Sodexo = {};
Sodexo.Page = function (dom, service) {
    var sodexoMap;

    var init = function () {
        navigator.geolocation.getCurrentPosition(createMap);
    };

    var createMap = function (location) {
        var coords = location.coords;
        var center = new google.maps.LatLng(coords.latitude, coords.longitude);
        var mapOptions = {
            zoom:14,
            mapTypeId:google.maps.MapTypeId.ROADMAP,
            center:center
        };
        var map = new google.maps.Map(dom.mapCanvas(), mapOptions);
        sodexoMap = Sodexo.Map(map, coords);
        fetchVenues(coords);
        bindEvents();
    };

    var fetchVenues = function (coords) {
        var params = {
            position:coords,
            radius:1
        };
        service.near(params, sodexoMap.updateUserLocation);
    };

    var bindEvents = function () {
        onDragEnd();
        onAddressFormSubmit();
    };

    var onDragEnd = function () {
        google.maps.event.addListener(sodexoMap.currentLocation, 'dragend', function () {
            var coords = { latitude:sodexoMap.currentPosition().lat(), longitude:sodexoMap.currentPosition().lng() };
            fetchVenues(coords);
        });
    };

    var onAddressFormSubmit = function () {
        dom.addressForm().bind('submit', function (e) {
            e.preventDefault();
            var address = dom.addressInput().value;
            service.near({radius:1, address:address}, sodexoMap.updateUserLocation);
            return false;
        });
    };

    init();
};
