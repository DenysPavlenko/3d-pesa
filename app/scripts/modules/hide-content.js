export default function () {
  var $hide = $('[data-hide-content-hide]');

  $hide.on('click', function () {
    var $this = $(this);
    var contentName = $this.attr('data-hide-content-hide');
    var $content = $('[data-hide-content="' + contentName + '"]')
    $content.fadeOut();
  });
}
