import checkWindowSize from '../common/check-window-size';
import bp from '../common/breakpoints';

export default function () {
  var $dropdowns = $('.js-dropdown');
  var fadeDuration = 100;
  var $body = $('body');

  // Return if $dropdowns doesn't exist
  if ($dropdowns.length === 0) { return; }

  $dropdowns.each(function () {
    var $dropdown = $(this);
    var $dropdownBody = $dropdown.find('.js-dropdown-body');
    var dropdownName = $dropdown.attr('data-dropdown');
    var $dropdownToggle = $dropdown.find('[data-dropdown-toggle]')
    var $dropdownClose = $('[data-dropdown-close="' + dropdownName + '"]');
    var $scrollbar = $dropdown.find('[data-simplebar]');
    var $window = $(window);
    var bpMin = $dropdown.attr('data-dropdown-min');
    var isOpened = false;

    // Mobile behaviour
    checkWindowSize('(max-width:' + bpMin + 'px)', function (e) {
      if (e.matches) {
        $dropdownBody.fadeOut(fadeDuration);
        $dropdownToggle.removeClass('is-active');
      }
    });

    $dropdownToggle.on('click', function () {
      if ($window.width() <= bpMin) { return }

      $dropdownToggle.toggleClass('is-active');
      $dropdownBody.fadeToggle(fadeDuration);
      isOpened = !isOpened;
      if ($scrollbar.length > 0) {
        setTimeout(function () {
          new SimpleBar($scrollbar[0]);
        }, 0);
      }
      if ($dropdownBody.css('position') === 'fixed') {
        $body.css('overflow-y', 'hidden');
      }
    });

    $window.on('click', function (e) {
      if ($(e.target).parents('[data-dropdown]')[0] !== $dropdown[0] && isOpened) {
        $dropdownBody.fadeOut(fadeDuration);
        $dropdownToggle.removeClass('is-active');
        isOpened = false;
        if ($dropdownBody.css('position') === 'fixed') {
          $body.css('overflow-y', 'visible');
        }
      }
    });

    $dropdownClose.on('click', function () {
      $dropdownBody.fadeOut(fadeDuration);
      $dropdownToggle.removeClass('is-active');
      isOpened = false;
      if ($dropdownBody.css('position') === 'fixed') {
        $body.css('overflow-y', 'visible');
      }
    });

    checkWindowSize('(min-width:' + bp.md + 'px)', function (e) {
      if (e.matches && $dropdownBody.css('position') !== 'fixed') {
        $body.css('overflow-y', 'visible');
      } else if (!e.matches && $dropdownBody.css('position') === 'fixed' && isOpened) {
        $body.css('overflow-y', 'hidden');
      }
    });
  });
}
