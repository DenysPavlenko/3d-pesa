export default function () {
  var $sidebar = $('.js-sidebar');
  var $sidebarOverlay = $('.js-sidebar-overlay');
  var $burger = $('.js-burger');
  var $close = $('.js-sidebar-close');
  var $body = $('body');

  // Return if $sidebar doesn't exist
  if ($sidebar.length === 0 || $burger.length === 0) { return; }

  $burger.on('click', function () {
    $sidebar.addClass('is-active');
    $sidebarOverlay.fadeIn(200);
    $body.css('overflow-y', 'hidden');
  });
  $close.on('click', function () {
    $sidebar.removeClass('is-active');
    $sidebarOverlay.fadeOut(200);
    $body.css('overflow-y', 'visible');
  });
  $sidebarOverlay.on('click', function (e) {
    $sidebar.removeClass('is-active');
    $sidebarOverlay.fadeOut(200);
    $body.css('overflow-y', 'visible');
  });
}
