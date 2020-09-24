export default function () {
  var $content = $('[data-directory-content]');
  var $open = $('[data-directory-open]');
  var $close = $('[data-directory-close]');
  var $body = $('body');

  // Return if $content doesn't exist
  if ($content.length === 0) { return; }

  $open.on('click', function () {
    showContent();
  });
  $close.on('click', function () {
    hideContent();
  });

  function showContent() {
    if ($content.css('position') === 'fixed') {
      $content.addClass('is-active');
      $body.css('overflow-y', 'hidden');
    }
  }
  function hideContent() {
    if ($content.css('position') === 'fixed') {
      $content.removeClass('is-active');
      $body.css('overflow-y', 'visible');
    }
  }
}
