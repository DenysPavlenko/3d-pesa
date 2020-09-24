export default function () {
  var $rangeInput = $('.js-range-input');
  var $rangeLine = $('.js-range-line');
  var $rangeValue = $('.js-range-value');
  var range = $rangeInput.val();
  var maxRange = $rangeInput.attr('max');

  setLineWidth(range);
  setInputRangeValue(range);

  $rangeInput.on('input', function () {
    var $this = $(this);
    range = $this.val();
    setLineWidth(range);
    setInputRangeValue(range);
  });

  function setLineWidth(range) {
    $rangeLine.css('width', range / maxRange  * 100 + '%');
  }
  function setInputRangeValue(range) {
    $rangeValue.html(range + ' ');
  }
}
