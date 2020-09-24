import breakpoints from '../common/breakpoints';

export default function () {
  var $container = $('.js-scroll-menu');
  var $list = $('.js-scroll-menu-list');
  var $listItems = $('[data-scroll-item]');
  var $content = $('.js-scroll-menu-content');
  var $contentItems = $('[data-scroll-content]');
  var $window = $(window);
  var $html = $('html, body');

  // Return if $container doesn't exist
  if ($container.length === 0) { return; }

  // Global variables
  var topOffset = 70;
  var listHeight = $list.outerHeight();

  var jsMediaQuery = window.matchMedia('(max-width:' + breakpoints.lg + 'px)');
  jsMediaQuery.addListener(WidthChange);
  WidthChange(jsMediaQuery);
  function WidthChange(e) {
    if (e.matches) {
      mobileScroll();
    } else {
      mobileScroll('off');
    }
  }

  function mobileScroll(state) {
    if (state === 'off') {
      $window.off('scroll', windowScroll);
      $window.off('resize', setContentBottomMargin);
      $listItems.off('click', listItemsClick);
      $list.removeAttr('style');
      $content.css({ 'margin-top': 0 });
      $content.css({ 'margin-bottom': 0 });
      return;
    }
    $window.on('scroll', windowScroll);
    // Scroll to the content item by $listItem click
    $listItems.on('click', listItemsClick);
    // Set content bottom margin
    setTimeout(function () {
      setContentBottomMargin();
    }, 0);
    $window.on('resize', setContentBottomMargin);
  }
  // Container scroll logic
  function windowScroll() {
    listHeight = $list.outerHeight();
    var windowTopOffset = $window.scrollTop();
    if (windowTopOffset >= $content.offset().top - topOffset - listHeight) {
      $list.css({ 'position': 'fixed', width: '100%', 'top': topOffset });
      $content.css({ 'margin-top': listHeight + 'px' });
    } else {
      $list.css({ 'position': 'static', width: '100vw' });
      $content.css({ 'margin-top': 0 });
    }
    // Scrollspy
    $listItems.each(function () {
      var $listItem = $(this);
      var listItemName = $listItem.attr('data-scroll-item');
      var contentItem = $('[data-scroll-content="' + listItemName + '"]');
      var contentItemOffset = contentItem.offset().top;
      var windowTopOffset = $window.scrollTop();
      if (windowTopOffset >= contentItemOffset - listHeight - topOffset - 33) {
        $listItems.removeClass('is-active');
        $listItem.addClass('is-active');
      }
    });
  }
  // Menu item click logic
  function listItemsClick() {
    var $listItem = $(this);
    var listItemName = $listItem.attr('data-scroll-item');
    var contentItem = $('[data-scroll-content="' + listItemName + '"]');
    $html.animate({ scrollTop: contentItem.offset().top - listHeight - topOffset });
    $listItems.removeClass('is-active');
    $listItem.addClass('is-active');
  }
  // Set bottom margin to content
  function setContentBottomMargin() {
    var windowHeight = $window.height();
    var lastContentItem = $contentItems.last();
    var contentBottomMargin = windowHeight - lastContentItem.height() - listHeight - topOffset * 2 - 20;
    if (contentBottomMargin <= 0) { return; }
    $content.css({ 'margin-bottom': contentBottomMargin + 'px' });
  }
}
