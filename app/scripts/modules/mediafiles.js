export default function () {
  var $mediafiles = $('.js-mediafiles');

  // Return if $mediafiles doesn't exist
  if ($mediafiles.length === 0) { return; }

  $mediafiles.magnificPopup({
    delegate: '.js-mediafiles-item',
    type: 'image',
    gallery: {
      enabled: true,
    },
  });
}
