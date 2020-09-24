export default function () {
  var $header = $('.js-content-header');
  var $body = $('body');

  // Return if $header doesn't exist
  if ($header.length === 0) { return; }

  setBodyPadding();

  var timeout;
  $(window).on('resize', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      setBodyPadding();
    }, 100);
  });

  function setBodyPadding() {
    if ($header.css('position') === 'fixed') {
      var headerHeight = $header.outerHeight();
      $body.css('padding-top', headerHeight + 'px')
    } else {
      $body.css('padding-top', 0)
    }
  }
}
