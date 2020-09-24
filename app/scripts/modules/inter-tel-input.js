export default function () {
  var $interTelInputs = $('.js-inter-tel-input');

  $interTelInputs.each(function () {
    var $interTelInput = $(this);
    var $select = $interTelInput.find('.js-inter-tel-input-select');
    var $options = $select.find('.js-inter-tel-input-options');
    var $input = $interTelInput.find('.js-inter-tel-input-input');
    var $currentIcon = $interTelInput.find('.js-inter-tel-input-current-icon');
    var $scrollbar = $select.find('[data-simplebar]');

    $select.on('click', function (e) {
      var $target = $(e.target);
      $interTelInput.toggleClass('is-expanded');
      $options.fadeToggle(100);
      if ($scrollbar.length > 0) {
        setTimeout(function () {
          new SimpleBar($scrollbar[0]);
        }, 0);
      }
      if ($target.attr('data-option-placeholder') || $target.parents('.js-inter-tel-input-option')) {
        var $option;
        if ($target.attr('data-option-placeholder')) {
          $option = $target;
        } else {
          $option = $target.parents('.js-inter-tel-input-option');
        }
        var $placeholder = $option.attr('data-option-placeholder');
        var $icon = $option.find('.js-inter-tel-input-icon');
        var $iconSrc = $icon.css('background-image');
        $input.attr('placeholder', $placeholder);
        $currentIcon.css('background-image', $iconSrc);
      }
    });

    $(window).on('click', function (e) {
      if ($(e.target).parents('.js-inter-tel-input-select')[0] !== $select[0]) {
        $interTelInput.removeClass('is-expanded');
        $options.fadeOut(100);
      }
    });
  });
}
