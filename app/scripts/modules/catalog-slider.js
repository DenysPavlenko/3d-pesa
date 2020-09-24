import bp from '../common/breakpoints';

export default function () {
  var $sliders = $('.js-catalog-slider');

  // Return if $sliders doesn't exist
  if ($sliders.length === 0) { return; }

  $sliders.each(function () {
    var $slider = $(this);
    var $prevArrow = $slider.parent().find('.js-catalog-slider-prev');
    var $nextArrow = $slider.parent().find('.js-catalog-slider-next');
    $slider.slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: $prevArrow,
      nextArrow: $nextArrow,
      responsive: [
        {
          breakpoint: bp.lg,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: bp.md,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: bp.sm,
          settings: {
            slidesToShow: 1,
            centerMode: true
          }
        },
        {
          breakpoint: bp.xs,
          settings: {
            slidesToShow: 1,
            centerMode: false
          }
        }
      ]
    });
  });
}
