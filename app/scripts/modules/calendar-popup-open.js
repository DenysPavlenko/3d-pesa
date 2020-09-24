export default function () {
  var $calendarPopup = $('[data-popup="calendar-popup"]');
  var $calendarPopupOpen = $('.js-calendar-popup-open');

  // Return if $calendarPopupOpen doesn't exist
  if ($calendarPopupOpen.length === 0) { return; }

  $calendarPopupOpen.on('click', function (e) {
    var $this = $(this);
    var calendarPopupOpenClass = $this.attr('data-calendar-popup-open-class');
    var $target = $(e.target);
    if ($target.hasClass(calendarPopupOpenClass)) {
      $calendarPopup.modal({
        showClose: false
      });
    }
  });
}
