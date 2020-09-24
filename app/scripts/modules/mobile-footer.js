export default function () {
  var $menu = $('.js-mobile-footer');
  var $body = $('body');

  // Return if $menu doesn't exist
  if ($menu.length === 0) { return; }

  setBodyPadding();

  var timeout;
  $(window).on('resize', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      setBodyPadding();
    }, 100);
  });

  function setBodyPadding() {
    if ($menu.css('display') !== 'none') {
      var menuHeight = $menu.outerHeight();
      $body.css('padding-bottom', menuHeight + 'px')
    } else {
      $body.css('padding-bottom', 0)
    }
  }
}
