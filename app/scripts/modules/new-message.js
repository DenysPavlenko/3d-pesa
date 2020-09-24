export default function () {
  var $expand = $('.js-new-message-expand');
  var $actionsDesktop = $('.js-new-message-actions-desktop');
  var $actionsMobile = $('.js-new-message-actions-mobile');
  var $window = $(window);
  var isMobileFlag = isMobile();

  var timer;
  $window.on('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (isMobileFlag !== isMobile()) {
        $expand.removeClass('is-active');
        $actionsDesktop.hide();
        $actionsMobile.hide();
        isMobileFlag = isMobile();
      }
    }, 100);
  });

  $expand.on('click', function () {
    $expand.toggleClass('is-active');
    if (isMobile()) {
      $actionsMobile.fadeToggle();
    } else {
      $actionsDesktop.fadeToggle();
    }
  });

  function isMobile() {
    return $window.width() < 992
  }
}
