export default function () {
  var map = document.querySelector('.js-time-recorder-map');
  var lat = 37.7749;
  var long = -122.4194;

  // Return if map doesn't exist
  if (!map) { return; }

  initializeMap(map);

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
