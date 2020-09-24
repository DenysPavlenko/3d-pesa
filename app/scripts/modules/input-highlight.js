export default function () {
  var $input = $('.js-input-highlight');

  // Return if $input doesn't exist
  if ($input.length === 0) { return; }

  $input.on('click', function () {
    $(this).select();
  });
}
