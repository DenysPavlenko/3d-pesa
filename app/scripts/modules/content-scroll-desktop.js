import breakpoints from '../common/breakpoints';

export default function () {
  var $container = $('.js-scroll-menu');
  var $list = $('.js-scroll-menu-list');
  var $listChildren = $list.children();
  var $listItems = $('[data-scroll-item]');
  var $content = $('.js-scroll-menu-content');
  var $contentItems = $('[data-scroll-content]');
  var $window = $(window);

  // Return if $container doesn't exist
  if ($container.length === 0) { return; }

  // Global variables
  var topOffset = 70;
  var simpleBar = new SimpleBar($('.js-scroll-menu-bar')[0]);
  var $scrollContainer = $(simpleBar.getScrollElement());

  var jsMediaQuery = window.matchMedia('(min-width:' + breakpoints.lg + 'px)');
  jsMediaQuery.addListener(WidthChange);
  WidthChange(jsMediaQuery);
  function WidthChange(e) {
    if (e.matches) {
      desktopScroll();
    } else {
      desktopScroll('off');
    }
  }

  function desktopScroll(state) {
    if (state === 'off') {
      if ($scrollContainer) {
        $scrollContainer.off('scroll', scrollContainer);
      }
      $listItems.off('click');
      $window.off('resize', setContentBottomMargin);
      $listChildren.css({ 'position': 'static' });
      $content.css({ 'margin-bottom': 0 });
      $listItems.removeClass('is-active');
      $listItems.eq(0).addClass('is-active');
      return;
    }
    // Stick/unstick $list on $scrollContainer scroll event
    $scrollContainer.on('scroll', scrollContainer);
    // Scroll to the content item by $listItem click
    $listItems.on('click', listItemsClick);
    // Set content bottom margin
    setTimeout(function () {
      setContentBottomMargin();
    }, 0);
    $window.on('resize', setContentBottomMargin);
  }
  // Container scroll logic
  function scrollContainer() {
    if ($container.offset().top <= topOffset) {
      $listChildren.css({ 'position': 'fixed', 'top': topOffset + 20 });
    } else {
      $listChildren.css({ 'position': 'static' });
    }
    // Scrollspy
    $listItems.each(function () {
      var $listItem = $(this);
      var listItemName = $listItem.attr('data-scroll-item');
      var contentItem = $('[data-scroll-content="' + listItemName + '"]');
      var contentItemOffset = contentItem.offset().top;
      if (contentItemOffset <= topOffset + 32) {
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
    var contentItemOffset = contentItem.get(0).offsetTop;
    $scrollContainer.animate({ scrollTop: contentItemOffset - 20 });
    $listItems.removeClass('is-active');
    $listItem.addClass('is-active');
  }
  // Set bottom margin to content
  function setContentBottomMargin() {
    var scrollContainerHeight = $scrollContainer.height();
    var lastContentItem = $contentItems.last();
    var contentBottomMargin = scrollContainerHeight - lastContentItem.height() - topOffset + 20;
    if (contentBottomMargin <= 0) { return; }
    $content.css({ 'margin-bottom': contentBottomMargin + 'px' });
  }
}
