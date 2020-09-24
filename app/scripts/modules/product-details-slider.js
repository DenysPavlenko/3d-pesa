import bp from '../common/breakpoints';

export default function () {
  var $slides = $('.js-product-details-slider');
  var $prevArrow = $('.js-product-details-slider-prev');
  var $nextArrow = $('.js-product-details-slider-next');
  var $slidesNavigation = $('.js-product-details-navigation');

  // Return if $slides doesn't exist
  if ($slides.length === 0) { return; }

  $slides.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    prevArrow: $prevArrow,
    nextArrow: $nextArrow,
    asNavFor: '.js-product-details-navigation',
    responsive: [
      {
        breakpoint: bp.md,
        settings: {
          arrows: true,
        }
      },
    ]
  });
  $slidesNavigation.slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    focusOnSelect: true,
    asNavFor: '.js-product-details-slider',
  });
}
