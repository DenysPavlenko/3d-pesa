export default function () {
  var $show = $('[data-switch-show]');
  var $hidden = $('[data-switch-hidden]');

  $hidden.hide();

  $show.on('click', function () {
    var $this = $(this);
    var contentShow = $this.attr('data-switch-show');
    var contentHide = $this.attr('data-switch-hide');
    var $contentHide = $('[data-switch-name="' + contentHide + '"]')
    var $contentShow = $('[data-switch-name="' + contentShow + '"]')
    $contentHide.fadeOut(200, function () {
      $contentShow.fadeIn(200);
    });
  });

}
