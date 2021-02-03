export default function () {
  var $close = $('.js-welcome-popup-close');
  var $video = $('.js-video-box-iframe');

  $close.on('click', function () {
    var src = $video.attr('src').replace(/\?autoplay=1/g, '');
    $video.attr('src', src);
  });
}
