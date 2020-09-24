export default function () {
  var $products = $('.js-food-shop-product');

  // Return if $products doesn't exist
  if ($products.length === 0) { return; }

  $products.each(function () {
    var $product = $(this);
    var $productHeader = $product.find('.food-shop-product__header');
    var $productBody = $product.find('.food-shop-product__body');
    var $productStatus = $product.find('.plus-minus');
    $productHeader.on('click', function () {
      $product.toggleClass('is-active');
      $productStatus.toggleClass('is-active');
      $productBody.fadeToggle(200);
    });
  });
}
