export default function () {
  var $input = $('.js-input-auto-width');

  // Return if $input doesn't exist
  if ($input.length === 0) { return; }

  $input.each(function () {
    var $this = $(this);
    $this.attr('size', $this.val().replace(/\s/g, '').length);
  });
}
