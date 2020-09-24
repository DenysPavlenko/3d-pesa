import bp from '../common/breakpoints';
import checkWindowSize from '../common/check-window-size';

export default function () {
  var mapSelectors = document.querySelectorAll('.js-shop-finder-map');
  var lat = 37.7749;
  var long = -122.4194;

  // Return if mapSelectors doesn't exist
  if (!mapSelectors) { return; }

  var $window = $(window);
  var $popup = $('[data-popup="shop-finder-popup"]');

  for (var i = 0; i < mapSelectors.length; i++) {
    initializeMap(mapSelectors[i]);
  }

  function initializeMap(map) {
    var myLatLng = { lat: lat, lng: long };

    var gmap = new google.maps.Map(map, {
      zoom: 12,
      center: myLatLng,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });

    var itm = document.querySelector('.js-shop-finder-map-infowindow');
    var cln = itm.cloneNode(true);
    var contentString = cln;

    var icon = {
      url: '../images/icons/find-shop-map-pin.svg',
      scaledSize: new google.maps.Size(60, 90),
    };

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: gmap,
      icon: icon,
    });

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    if ($window.width() > 992) {
      infowindow.open(gmap, marker);
    }

    checkWindowSize('(max-width:' + bp.md + 'px)', function (e) {
      if (e.matches) {
        infowindow.close();
      }
    });

    marker.addListener("click", function () {
      if ($window.width() > 992) {
        infowindow.open(gmap, marker);
      } else {
        $popup.modal({
          closeExisting: false,
          showClose: false
        });
      }
    });
  }
}
