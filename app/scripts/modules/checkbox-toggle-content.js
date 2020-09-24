export default function () {
  var $checkboxes = $('[data-checkbox-toggle]');
  var $toggleContents = $('[data-checkbox-toggle-content]');

  // Return if $checkboxes doesn't exist
  if ($checkboxes.length === 0) { return; }

  $toggleContents.hide();

  $checkboxes.each(function () {
    var $checkbox = $(this);
    if ($checkbox.is(":checked") && !$checkbox.attr('data-checkbox-reversed')) {
      var checkedCheckboxName = $checkbox.attr('data-checkbox-toggle');
      $('[data-checkbox-toggle-content=' + checkedCheckboxName + ']').show();
    }

    $checkbox.on('click', function () {
      var checkboxName = $checkbox.attr('data-checkbox-toggle');
      $('[data-checkbox-toggle-content=' + checkboxName + ']').fadeToggle();
    });
  });
}
