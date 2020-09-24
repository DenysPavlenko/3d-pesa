export default function () {
  var mapSelectors = document.querySelectorAll('.js-time-recorder-map-preview');
  var lat = 37.7749;
  var long = -122.4194;

  // Return if mapSelectors doesn't exist
  if (!mapSelectors) { return; }

  for (var i = 0; i < mapSelectors.length; i++) {
    initializeMap(mapSelectors[i]);
  }

  function initializeMap(map) {
    var myLatLng = { lat: lat, lng: long };
    new google.maps.Map(map, {
      zoom: 12,
      center: myLatLng,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });
  }
}
