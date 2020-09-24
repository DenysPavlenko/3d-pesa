export default function () {
  var $postImages = $('.js-post-images');

  // Return if $postImages doesn't exist
  if ($postImages.length === 0) { return; }

  $postImages.magnificPopup({
    delegate: '.js-post-images-item',
    type: 'image',
    gallery: {
      enabled: true,
    },
  });
}
