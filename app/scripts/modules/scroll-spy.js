export default function () {
  var $anchorLinks = $('.js-scroll-spy-link');

  // Return if $anchorLinks doesn't exist
  if ($anchorLinks.length === 0) { return; }

  $(window).on('scroll', function () {
    $anchorLinks.each(function () {
      var $link = $(this);
      // Get section name
      var anchor = $link.attr('href');
      var section = $(anchor);
      // Offsets
      var windowTop = window.pageYOffset;
      var sectionTop = section.offset().top;
      // Add or remove an active class from nav link
      if (windowTop > sectionTop - 1) {
        $anchorLinks.removeClass('is-active');
        $link.addClass('is-active');
      } else {
        $link.removeClass('is-active');
      }
    });
  })
}
