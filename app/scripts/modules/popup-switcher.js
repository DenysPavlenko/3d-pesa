export default function () {
  var $switcher = $('.js-popup-switcher');

  $switcher.each(function () {
    var $this = $(this);
    var $contentToHide = $('[data-popup-content="'+ $this.attr("data-popup-content-hide") + '"]');
    var $contentToShow = $('[data-popup-content="'+ $this.attr("data-popup-content-show") + '"]');
    $contentToHide.show();
    $contentToShow.hide();

    $this.on('click', function () {
      $contentToHide.hide();
      $contentToShow.show();
    });
  });
}
