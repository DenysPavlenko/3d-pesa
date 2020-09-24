export default function () {
  var $popupAuto = $('[data-popup-auto]');
  var $popupOpen = $('[data-popup-open]');
  var $popupClose = $('[data-popup-close]');

  // Open on widnow load
  if ($popupAuto.length > 0) {
    $popupAuto.each(function () {
      var $popup = $(this);
      createScrollBar($popup);
      $popup.modal({
        closeExisting: false,
        showClose: false
      });
    });
  }

  $popupClose.on('click', function () {
    $.modal.close();
  });

  // Return if $popupOpen doesn't exist
  if ($popupOpen.length === 0) { return; }

  $popupOpen.on('click', function () {
    var $this = $(this);
    var popupName = $this.attr('data-popup-open');
    var $popup = $('[data-popup="' + popupName + '"]');
    var $window = $(window);
    var bpMax = $this.attr('data-popup-max');
    // Mobile behaviour
    if ($window.width() >= bpMax) { return; }

    createScrollBar($popup);
    $popup.modal({
      closeExisting: false,
      showClose: false
    });
  });

  function createScrollBar(popup) {
    var $scrollBar = popup.find('[data-simplebar]');
    if ($scrollBar.length > 0) {
      setTimeout(function () {
        new SimpleBar($scrollBar[0])
      }, 0);
    }
  }
}
