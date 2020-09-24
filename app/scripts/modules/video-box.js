export default function () {
  var $preview = $('.js-video-box-preview');
  var $button = $('.js-video-box-button');
  var $video = $('.js-video-box-iframe');

  // Return if $preview doesn't exist
  if ($preview.length === 0) { return; }

  $button.on('click', function () {
    $preview.fadeOut(1200);
    $video[0].src += "?autoplay=1";
  });
}
