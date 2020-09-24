export default function () {
  var $timetables = $('.js-timetable');

  // Return if $timetables doesn't exist
  if ($timetables.length === 0) { return; }

  $timetables.each(function () {
    var $timetable = $(this);
    var $header = $timetable.find('.js-timetable-header');
    var $list = $timetable.find('.js-timetable-list');
    $header.on('click', function () {
      $list.fadeToggle();
      $timetable.toggleClass('is-active');
    });
  });
}
