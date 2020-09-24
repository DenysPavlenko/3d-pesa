export default function () {
  var $items = $('.js-navigation-item');

  // Return if $item doesn't exist
  if ($items.length === 0) { return; }

  $items.on('click', function (e) {
    var $this = $(this);
    var $innerItems = $this.find('.js-navigation-items-inner');
    if ($innerItems && !$(e.target).parents().hasClass('js-navigation-items-inner')) {
      $innerItems.slideToggle(100);
    }
  });
}
