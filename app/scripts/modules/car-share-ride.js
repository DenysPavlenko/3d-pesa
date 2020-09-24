export default function () {
  var $mapSelector = $('.js-car-share-ride-map');
  // var $passengerDrag = $('.js-passenger-ride-drag');
  // var $passengerInfo = $('.js-passenger-ride-info');

  // Return if $mapSelector doesn't exist
  if ($mapSelector.length === 0) { return; }

  // Map
  initializeMap($mapSelector[0]);
  function initializeMap(map) {
    var myLatLng = { lat: 37.7749, lng: -122.4194 };
    new google.maps.Map(map, {
      zoom: 14,
      center: myLatLng,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });
  }

  // $passengerDrag.on('click', function () {
  //   $passengerInfo.toggleClass('is-active');
  // });
}
