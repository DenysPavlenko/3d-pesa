'use strict';

function navigation () {
  var $items = $('.js-navigation-item'); // Return if $item doesn't exist

  if ($items.length === 0) {
    return;
  }

  $items.on('click', function (e) {
    var $this = $(this);
    var $innerItems = $this.find('.js-navigation-items-inner');

    if ($innerItems && !$(e.target).parents().hasClass('js-navigation-items-inner')) {
      $innerItems.slideToggle(100);
    }
  });
}

function checkWindowSize (media, callback) {
  var jsMediaQuery = window.matchMedia(media);
  jsMediaQuery.addListener(callback);
  callback(jsMediaQuery);
}

var bp = {
  xxl: '1361',
  xl: '1200',
  lg: '992',
  md: '768',
  sm: '577',
  xs: '361'
};

function dropdown () {
  var $dropdowns = $('.js-dropdown');
  var fadeDuration = 100;
  var $body = $('body'); // Return if $dropdowns doesn't exist

  if ($dropdowns.length === 0) {
    return;
  }

  $dropdowns.each(function () {
    var $dropdown = $(this);
    var $dropdownBody = $dropdown.find('.js-dropdown-body');
    var dropdownName = $dropdown.attr('data-dropdown');
    var $dropdownToggle = $dropdown.find('[data-dropdown-toggle]');
    var $dropdownClose = $('[data-dropdown-close="' + dropdownName + '"]');
    var $scrollbar = $dropdown.find('[data-simplebar]');
    var $window = $(window);
    var bpMin = $dropdown.attr('data-dropdown-min');
    var isOpened = false; // Mobile behaviour

    checkWindowSize('(max-width:' + bpMin + 'px)', function (e) {
      if (e.matches) {
        $dropdownBody.fadeOut(fadeDuration);
        $dropdownToggle.removeClass('is-active');
      }
    });
    $dropdownToggle.on('click', function () {
      if ($window.width() <= bpMin) {
        return;
      }

      $dropdownToggle.toggleClass('is-active');
      $dropdownBody.fadeToggle(fadeDuration);
      isOpened = !isOpened;

      if ($scrollbar.length > 0) {
        setTimeout(function () {
          new SimpleBar($scrollbar[0]);
        }, 0);
      }

      if ($dropdownBody.css('position') === 'fixed') {
        $body.css('overflow-y', 'hidden');
      }
    });
    $window.on('click', function (e) {
      if ($(e.target).parents('[data-dropdown]')[0] !== $dropdown[0] && isOpened) {
        $dropdownBody.fadeOut(fadeDuration);
        $dropdownToggle.removeClass('is-active');
        isOpened = false;

        if ($dropdownBody.css('position') === 'fixed') {
          $body.css('overflow-y', 'visible');
        }
      }
    });
    $dropdownClose.on('click', function () {
      $dropdownBody.fadeOut(fadeDuration);
      $dropdownToggle.removeClass('is-active');
      isOpened = false;

      if ($dropdownBody.css('position') === 'fixed') {
        $body.css('overflow-y', 'visible');
      }
    });
    checkWindowSize('(min-width:' + bp.md + 'px)', function (e) {
      if (e.matches && $dropdownBody.css('position') !== 'fixed') {
        $body.css('overflow-y', 'visible');
      } else if (!e.matches && $dropdownBody.css('position') === 'fixed' && isOpened) {
        $body.css('overflow-y', 'hidden');
      }
    });
  });
}

function sidebar () {
  var $sidebar = $('.js-sidebar');
  var $sidebarOverlay = $('.js-sidebar-overlay');
  var $burger = $('.js-burger');
  var $close = $('.js-sidebar-close');
  var $body = $('body'); // Return if $sidebar doesn't exist

  if ($sidebar.length === 0 || $burger.length === 0) {
    return;
  }

  $burger.on('click', function () {
    $sidebar.addClass('is-active');
    $sidebarOverlay.fadeIn(200);
    $body.css('overflow-y', 'hidden');
  });
  $close.on('click', function () {
    $sidebar.removeClass('is-active');
    $sidebarOverlay.fadeOut(200);
    $body.css('overflow-y', 'visible');
  });
  $sidebarOverlay.on('click', function (e) {
    $sidebar.removeClass('is-active');
    $sidebarOverlay.fadeOut(200);
    $body.css('overflow-y', 'visible');
  });
}

function popup () {
  var $popupAuto = $('[data-popup-auto]');
  var $popupOpen = $('[data-popup-open]');
  var $popupClose = $('[data-popup-close]'); // Open on widnow load

  if ($popupAuto.length > 0) {
    $popupAuto.each(function () {
      var $popup = $(this);
      createScrollBar($popup);
      $popup.modal({
        closeExisting: false,
        showClose: false
      });
    });
  }

  $popupClose.on('click', function () {
    $.modal.close();
  }); // Return if $popupOpen doesn't exist

  if ($popupOpen.length === 0) {
    return;
  }

  $popupOpen.on('click', function () {
    var $this = $(this);
    var popupName = $this.attr('data-popup-open');
    var $popup = $('[data-popup="' + popupName + '"]');
    var $window = $(window);
    var bpMax = $this.attr('data-popup-max'); // Mobile behaviour

    if ($window.width() >= bpMax) {
      return;
    }

    createScrollBar($popup);
    $popup.modal({
      closeExisting: false,
      showClose: false
    });
  });

  function createScrollBar(popup) {
    var $scrollBar = popup.find('[data-simplebar]');

    if ($scrollBar.length > 0) {
      setTimeout(function () {
        new SimpleBar($scrollBar[0]);
      }, 0);
    }
  }
}

function videoBox () {
  var $preview = $('.js-video-box-preview');
  var $button = $('.js-video-box-button');
  var $video = $('.js-video-box-iframe'); // Return if $preview doesn't exist

  if ($preview.length === 0) {
    return;
  }

  $button.on('click', function () {
    $preview.fadeOut(1200);
    $video[0].src += "?autoplay=1";
  });
}

function select () {
  var $selects = $('.js-select');
  $selects.each(function () {
    var $select = $(this);
    var $selectLabel = $select.find('.js-select-label');
    var $scrollbar = $select.find('[data-select-simplebar]');
    var $options = $select.find('.js-select-options');
    var $input = $select.find('.js-select-input');
    var optionsWidth;
    $select.on('click', function (e) {
      var $target = $(e.target);

      if ($target.parents().hasClass('js-select-footer') || $target.hasClass('js-select-footer')) {
        return;
      }

      $select.toggleClass('is-expanded');
      $options.fadeToggle(100);
      optionsWidth = optionsWidth ? optionsWidth : $options.width();
      $options.css('width', optionsWidth);

      if ($scrollbar.length > 0) {
        setTimeout(function () {
          new SimpleBar($scrollbar[0]);
        }, 0);
      }

      if ($target.attr('data-option') || $target.parents('.js-select-option')) {
        var $option;

        if ($target.attr('data-option')) {
          $option = $target;
        } else {
          $option = $target.parents('.js-select-option');
        }

        var $optionData = $option.attr('data-option');
        var $optionContent = $option.html();
        $selectLabel.attr('data-selected', $optionData);
        $selectLabel.html($optionContent);
        $input.attr('value', $optionData);
      }
    });
    $(window).on('click', function (e) {
      if ($(e.target).parents('.js-select')[0] !== $select[0]) {
        $select.removeClass('is-expanded');
        $options.fadeOut(100);
      }
    });
  });
}

function tabs () {
  var $tabsContainers = $('.js-tabs'); // Return if $tabsContainers doesn't exist

  if ($tabsContainers.length === 0) {
    return;
  }

  $tabsContainers.each(function () {
    var $tabsContainer = $(this);
    var $tabs = $tabsContainer.find('.js-tab');
    var $activeTab = $tabsContainer.find('.js-tab.is-active');
    var activeTabName = $activeTab.attr('data-tab');
    var tabsNames = [];
    $tabs.each(function () {
      tabsNames.push('[data-content="' + $(this).attr("data-tab") + '"]');
    });
    var $tabsContent = $(tabsNames.toString());
    $tabsContent.hide();
    $tabsContent.each(function () {
      if ($(this).attr('data-content') === activeTabName) {
        $(this).show();
      }
    });
    $tabs.on('click', function () {
      var $tab = $(this);
      var dataTab = $tab.attr('data-tab');
      $tabs.removeClass('is-active');
      $tab.addClass('is-active');
      $tabsContent.hide();
      $tabsContent.each(function () {
        var $tab = $(this);
        var dataContent = $tab.attr('data-content');

        if (dataContent === dataTab) {
          $tab.show();
        }
      });
    });
  });
}

function mobileFooter () {
  var $menu = $('.js-mobile-footer');
  var $body = $('body'); // Return if $menu doesn't exist

  if ($menu.length === 0) {
    return;
  }

  setBodyPadding();
  var timeout;
  $(window).on('resize', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      setBodyPadding();
    }, 100);
  });

  function setBodyPadding() {
    if ($menu.css('display') !== 'none') {
      var menuHeight = $menu.outerHeight();
      $body.css('padding-bottom', menuHeight + 'px');
    } else {
      $body.css('padding-bottom', 0);
    }
  }
}

function interTelInput () {
  var $interTelInputs = $('.js-inter-tel-input');
  $interTelInputs.each(function () {
    var $interTelInput = $(this);
    var $select = $interTelInput.find('.js-inter-tel-input-select');
    var $options = $select.find('.js-inter-tel-input-options');
    var $input = $interTelInput.find('.js-inter-tel-input-input');
    var $currentIcon = $interTelInput.find('.js-inter-tel-input-current-icon');
    var $scrollbar = $select.find('[data-simplebar]');
    $select.on('click', function (e) {
      var $target = $(e.target);
      $interTelInput.toggleClass('is-expanded');
      $options.fadeToggle(100);

      if ($scrollbar.length > 0) {
        setTimeout(function () {
          new SimpleBar($scrollbar[0]);
        }, 0);
      }

      if ($target.attr('data-option-placeholder') || $target.parents('.js-inter-tel-input-option')) {
        var $option;

        if ($target.attr('data-option-placeholder')) {
          $option = $target;
        } else {
          $option = $target.parents('.js-inter-tel-input-option');
        }

        var $placeholder = $option.attr('data-option-placeholder');
        var $icon = $option.find('.js-inter-tel-input-icon');
        var $iconSrc = $icon.css('background-image');
        $input.attr('placeholder', $placeholder);
        $currentIcon.css('background-image', $iconSrc);
      }
    });
    $(window).on('click', function (e) {
      if ($(e.target).parents('.js-inter-tel-input-select')[0] !== $select[0]) {
        $interTelInput.removeClass('is-expanded');
        $options.fadeOut(100);
      }
    });
  });
}

function timetable () {
  var $timetables = $('.js-timetable'); // Return if $timetables doesn't exist

  if ($timetables.length === 0) {
    return;
  }

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

function textAreaResize () {
  var textareas = document.querySelectorAll('.js-textarea-resize'); // Return if textareas don't exist

  if (!textareas) {
    return;
  }

  for (var i = 0; i < textareas.length; i++) {
    textareas[i].addEventListener('keydown', function () {
      var textarea = this;
      textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
    });
  }
}

function timeRecorderMapPreview () {
  var mapSelectors = document.querySelectorAll('.js-time-recorder-map-preview');
  var lat = 37.7749;

  var _long = -122.4194; // Return if mapSelectors doesn't exist


  if (!mapSelectors) {
    return;
  }

  for (var i = 0; i < mapSelectors.length; i++) {
    initializeMap(mapSelectors[i]);
  }

  function initializeMap(map) {
    var myLatLng = {
      lat: lat,
      lng: _long
    };
    new google.maps.Map(map, {
      zoom: 12,
      center: myLatLng,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });
  }
}

function timeRecorderMap () {
  var map = document.querySelector('.js-time-recorder-map');
  var lat = 37.7749;

  var _long = -122.4194; // Return if map doesn't exist


  if (!map) {
    return;
  }

  initializeMap(map);

  function initializeMap(map) {
    var myLatLng = {
      lat: lat,
      lng: _long
    };
    new google.maps.Map(map, {
      zoom: 12,
      center: myLatLng,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });
  }
}

function switchContent () {
  var $show = $('[data-switch-show]');
  var $hidden = $('[data-switch-hidden]');
  $hidden.hide();
  $show.on('click', function () {
    var $this = $(this);
    var contentShow = $this.attr('data-switch-show');
    var contentHide = $this.attr('data-switch-hide');
    var $contentHide = $('[data-switch-name="' + contentHide + '"]');
    var $contentShow = $('[data-switch-name="' + contentShow + '"]');
    $contentHide.fadeOut(200, function () {
      $contentShow.fadeIn(200);
    });
  });
}

function inputHighlight () {
  var $input = $('.js-input-highlight'); // Return if $input doesn't exist

  if ($input.length === 0) {
    return;
  }

  $input.on('click', function () {
    $(this).select();
  });
}

function inputAutoWidth () {
  var $input = $('.js-input-auto-width'); // Return if $input doesn't exist

  if ($input.length === 0) {
    return;
  }

  $input.each(function () {
    var $this = $(this);
    $this.attr('size', $this.val().replace(/\s/g, '').length);
  });
}

function calendarPopupOpen () {
  var $calendarPopup = $('[data-popup="calendar-popup"]');
  var $calendarPopupOpen = $('.js-calendar-popup-open'); // Return if $calendarPopupOpen doesn't exist

  if ($calendarPopupOpen.length === 0) {
    return;
  }

  $calendarPopupOpen.on('click', function (e) {
    var $this = $(this);
    var calendarPopupOpenClass = $this.attr('data-calendar-popup-open-class');
    var $target = $(e.target);

    if ($target.hasClass(calendarPopupOpenClass)) {
      $calendarPopup.modal({
        showClose: false
      });
    }
  });
}

function postImages () {
  var $postImages = $('.js-post-images'); // Return if $postImages doesn't exist

  if ($postImages.length === 0) {
    return;
  }

  $postImages.magnificPopup({
    delegate: '.js-post-images-item',
    type: 'image',
    gallery: {
      enabled: true
    }
  });
}

function mediafiles () {
  var $mediafiles = $('.js-mediafiles'); // Return if $mediafiles doesn't exist

  if ($mediafiles.length === 0) {
    return;
  }

  $mediafiles.magnificPopup({
    delegate: '.js-mediafiles-item',
    type: 'image',
    gallery: {
      enabled: true
    }
  });
}

function hideContent () {
  var $hide = $('[data-hide-content-hide]');
  $hide.on('click', function () {
    var $this = $(this);
    var contentName = $this.attr('data-hide-content-hide');
    var $content = $('[data-hide-content="' + contentName + '"]');
    $content.fadeOut();
  });
}

function directory () {
  var $content = $('[data-directory-content]');
  var $open = $('[data-directory-open]');
  var $close = $('[data-directory-close]');
  var $body = $('body'); // Return if $content doesn't exist

  if ($content.length === 0) {
    return;
  }

  $open.on('click', function () {
    showContent();
  });
  $close.on('click', function () {
    hideContent();
  });

  function showContent() {
    if ($content.css('position') === 'fixed') {
      $content.addClass('is-active');
      $body.css('overflow-y', 'hidden');
    }
  }

  function hideContent() {
    if ($content.css('position') === 'fixed') {
      $content.removeClass('is-active');
      $body.css('overflow-y', 'visible');
    }
  }
}

function newMessage () {
  var $expand = $('.js-new-message-expand');
  var $actionsDesktop = $('.js-new-message-actions-desktop');
  var $actionsMobile = $('.js-new-message-actions-mobile');
  var $window = $(window);
  var isMobileFlag = isMobile();
  var timer;
  $window.on('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (isMobileFlag !== isMobile()) {
        $expand.removeClass('is-active');
        $actionsDesktop.hide();
        $actionsMobile.hide();
        isMobileFlag = isMobile();
      }
    }, 100);
  });
  $expand.on('click', function () {
    $expand.toggleClass('is-active');

    if (isMobile()) {
      $actionsMobile.fadeToggle();
    } else {
      $actionsDesktop.fadeToggle();
    }
  });

  function isMobile() {
    return $window.width() < 992;
  }
}

function usersNearbyMap () {
  var mapSelectors = document.querySelectorAll('.js-users-nearby-map');
  var lat = 37.7749;

  var _long = -122.4194; // Return if mapSelectors doesn't exist


  if (!mapSelectors) {
    return;
  }

  var $window = $(window);
  var $popup = $('[data-popup="contact-popup"]');

  for (var i = 0; i < mapSelectors.length; i++) {
    initializeMap(mapSelectors[i]);
  }

  function initializeMap(map) {
    var myLatLng = {
      lat: lat,
      lng: _long
    };
    var gmap = new google.maps.Map(map, {
      zoom: 12,
      center: myLatLng,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });
    var itm = document.querySelector('.js-users-nearby-map-infowindow');
    var cln = itm.cloneNode(true);
    var contentString = cln;
    var icon = {
      url: '../images/icons/user-pin.svg',
      scaledSize: new google.maps.Size(48, 60)
    };
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: gmap,
      icon: icon
    });
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    if ($window.width() > 992) {
      infowindow.open(gmap, marker);
    }

    checkWindowSize('(max-width:' + bp.md + 'px)', function (e) {
      if (e.matches) {
        infowindow.close();
      }
    });
    marker.addListener("click", function () {
      if ($window.width() > 992) {
        infowindow.open(gmap, marker);
      } else {
        $popup.modal({
          closeExisting: false,
          showClose: false
        });
      }
    });
  }
}

function range () {
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
    $rangeLine.css('width', range / maxRange * 100 + '%');
  }

  function setInputRangeValue(range) {
    $rangeValue.html(range + ' ');
  }
}

function catalogSlider () {
  var $sliders = $('.js-catalog-slider'); // Return if $sliders doesn't exist

  if ($sliders.length === 0) {
    return;
  }

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
      responsive: [{
        breakpoint: bp.lg,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: bp.md,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: bp.sm,
        settings: {
          slidesToShow: 1,
          centerMode: true
        }
      }, {
        breakpoint: bp.xs,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }]
    });
  });
}

function productDetailsSlider () {
  var $slides = $('.js-product-details-slider');
  var $prevArrow = $('.js-product-details-slider-prev');
  var $nextArrow = $('.js-product-details-slider-next');
  var $slidesNavigation = $('.js-product-details-navigation'); // Return if $slides doesn't exist

  if ($slides.length === 0) {
    return;
  }

  $slides.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    prevArrow: $prevArrow,
    nextArrow: $nextArrow,
    asNavFor: '.js-product-details-navigation',
    responsive: [{
      breakpoint: bp.md,
      settings: {
        arrows: true
      }
    }]
  });
  $slidesNavigation.slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    focusOnSelect: true,
    asNavFor: '.js-product-details-slider'
  });
}

function contentHeader () {
  var $header = $('.js-content-header');
  var $body = $('body'); // Return if $header doesn't exist

  if ($header.length === 0) {
    return;
  }

  setBodyPadding();
  var timeout;
  $(window).on('resize', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      setBodyPadding();
    }, 100);
  });

  function setBodyPadding() {
    if ($header.css('position') === 'fixed') {
      var headerHeight = $header.outerHeight();
      $body.css('padding-top', headerHeight + 'px');
    } else {
      $body.css('padding-top', 0);
    }
  }
}

function foodShopProduct () {
  var $products = $('.js-food-shop-product'); // Return if $products doesn't exist

  if ($products.length === 0) {
    return;
  }

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

function scrollSpy () {
  var $anchorLinks = $('.js-scroll-spy-link'); // Return if $anchorLinks doesn't exist

  if ($anchorLinks.length === 0) {
    return;
  }

  $(window).on('scroll', function () {
    $anchorLinks.each(function () {
      var $link = $(this); // Get section name

      var anchor = $link.attr('href');
      var section = $(anchor); // Offsets

      var windowTop = window.pageYOffset;
      var sectionTop = section.offset().top; // Add or remove an active class from nav link

      if (windowTop > sectionTop - 1) {
        $anchorLinks.removeClass('is-active');
        $link.addClass('is-active');
      } else {
        $link.removeClass('is-active');
      }
    });
  });
}

function contentScrollDesktop () {
  var $container = $('.js-scroll-menu');
  var $list = $('.js-scroll-menu-list');
  var $listChildren = $list.children();
  var $listItems = $('[data-scroll-item]');
  var $content = $('.js-scroll-menu-content');
  var $contentItems = $('[data-scroll-content]');
  var $window = $(window); // Return if $container doesn't exist

  if ($container.length === 0) {
    return;
  } // Global variables


  var topOffset = 70;
  var simpleBar = new SimpleBar($('.js-scroll-menu-bar')[0]);
  var $scrollContainer = $(simpleBar.getScrollElement());
  var jsMediaQuery = window.matchMedia('(min-width:' + bp.lg + 'px)');
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
      $listChildren.css({
        'position': 'static'
      });
      $content.css({
        'margin-bottom': 0
      });
      $listItems.removeClass('is-active');
      $listItems.eq(0).addClass('is-active');
      return;
    } // Stick/unstick $list on $scrollContainer scroll event


    $scrollContainer.on('scroll', scrollContainer); // Scroll to the content item by $listItem click

    $listItems.on('click', listItemsClick); // Set content bottom margin

    setTimeout(function () {
      setContentBottomMargin();
    }, 0);
    $window.on('resize', setContentBottomMargin);
  } // Container scroll logic


  function scrollContainer() {
    if ($container.offset().top <= topOffset) {
      $listChildren.css({
        'position': 'fixed',
        'top': topOffset + 20
      });
    } else {
      $listChildren.css({
        'position': 'static'
      });
    } // Scrollspy


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
  } // Menu item click logic


  function listItemsClick() {
    var $listItem = $(this);
    var listItemName = $listItem.attr('data-scroll-item');
    var contentItem = $('[data-scroll-content="' + listItemName + '"]');
    var contentItemOffset = contentItem.get(0).offsetTop;
    $scrollContainer.animate({
      scrollTop: contentItemOffset - 20
    });
    $listItems.removeClass('is-active');
    $listItem.addClass('is-active');
  } // Set bottom margin to content


  function setContentBottomMargin() {
    var scrollContainerHeight = $scrollContainer.height();
    var lastContentItem = $contentItems.last();
    var contentBottomMargin = scrollContainerHeight - lastContentItem.height() - topOffset + 20;

    if (contentBottomMargin <= 0) {
      return;
    }

    $content.css({
      'margin-bottom': contentBottomMargin + 'px'
    });
  }
}

function contentScrollMobile () {
  var $container = $('.js-scroll-menu');
  var $list = $('.js-scroll-menu-list');
  var $listItems = $('[data-scroll-item]');
  var $content = $('.js-scroll-menu-content');
  var $contentItems = $('[data-scroll-content]');
  var $window = $(window);
  var $html = $('html, body'); // Return if $container doesn't exist

  if ($container.length === 0) {
    return;
  } // Global variables


  var topOffset = 70;
  var listHeight = $list.outerHeight();
  var jsMediaQuery = window.matchMedia('(max-width:' + bp.lg + 'px)');
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
      $content.css({
        'margin-top': 0
      });
      $content.css({
        'margin-bottom': 0
      });
      return;
    }

    $window.on('scroll', windowScroll); // Scroll to the content item by $listItem click

    $listItems.on('click', listItemsClick); // Set content bottom margin

    setTimeout(function () {
      setContentBottomMargin();
    }, 0);
    $window.on('resize', setContentBottomMargin);
  } // Container scroll logic


  function windowScroll() {
    listHeight = $list.outerHeight();
    var windowTopOffset = $window.scrollTop();

    if (windowTopOffset >= $content.offset().top - topOffset - listHeight) {
      $list.css({
        'position': 'fixed',
        width: '100%',
        'top': topOffset
      });
      $content.css({
        'margin-top': listHeight + 'px'
      });
    } else {
      $list.css({
        'position': 'static',
        width: '100vw'
      });
      $content.css({
        'margin-top': 0
      });
    } // Scrollspy


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
  } // Menu item click logic


  function listItemsClick() {
    var $listItem = $(this);
    var listItemName = $listItem.attr('data-scroll-item');
    var contentItem = $('[data-scroll-content="' + listItemName + '"]');
    $html.animate({
      scrollTop: contentItem.offset().top - listHeight - topOffset
    });
    $listItems.removeClass('is-active');
    $listItem.addClass('is-active');
  } // Set bottom margin to content


  function setContentBottomMargin() {
    var windowHeight = $window.height();
    var lastContentItem = $contentItems.last();
    var contentBottomMargin = windowHeight - lastContentItem.height() - listHeight - topOffset * 2 - 20;

    if (contentBottomMargin <= 0) {
      return;
    }

    $content.css({
      'margin-bottom': contentBottomMargin + 'px'
    });
  }
}

function carShareRide () {
  var $mapSelector = $('.js-car-share-ride-map'); // var $passengerDrag = $('.js-passenger-ride-drag');
  // var $passengerInfo = $('.js-passenger-ride-info');
  // Return if $mapSelector doesn't exist

  if ($mapSelector.length === 0) {
    return;
  } // Map


  initializeMap($mapSelector[0]);

  function initializeMap(map) {
    var myLatLng = {
      lat: 37.7749,
      lng: -122.4194
    };
    new google.maps.Map(map, {
      zoom: 14,
      center: myLatLng,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });
  } // $passengerDrag.on('click', function () {
  //   $passengerInfo.toggleClass('is-active');
  // });

}

function shopFinderMap () {
  var mapSelectors = document.querySelectorAll('.js-shop-finder-map');
  var lat = 37.7749;

  var _long = -122.4194; // Return if mapSelectors doesn't exist


  if (!mapSelectors) {
    return;
  }

  var $window = $(window);
  var $popup = $('[data-popup="shop-finder-popup"]');

  for (var i = 0; i < mapSelectors.length; i++) {
    initializeMap(mapSelectors[i]);
  }

  function initializeMap(map) {
    var myLatLng = {
      lat: lat,
      lng: _long
    };
    var gmap = new google.maps.Map(map, {
      zoom: 12,
      center: myLatLng,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });
    var itm = document.querySelector('.js-shop-finder-map-infowindow');
    var cln = itm.cloneNode(true);
    var contentString = cln;
    var icon = {
      url: '../images/icons/find-shop-map-pin.svg',
      scaledSize: new google.maps.Size(60, 90)
    };
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: gmap,
      icon: icon
    });
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    if ($window.width() > 992) {
      infowindow.open(gmap, marker);
    }

    checkWindowSize('(max-width:' + bp.md + 'px)', function (e) {
      if (e.matches) {
        infowindow.close();
      }
    });
    marker.addListener("click", function () {
      if ($window.width() > 992) {
        infowindow.open(gmap, marker);
      } else {
        $popup.modal({
          closeExisting: false,
          showClose: false
        });
      }
    });
  }
}

function popupSwitcher () {
  var $switcher = $('.js-popup-switcher');
  $switcher.each(function () {
    var $this = $(this);
    var $contentToHide = $('[data-popup-content="' + $this.attr("data-popup-content-hide") + '"]');
    var $contentToShow = $('[data-popup-content="' + $this.attr("data-popup-content-show") + '"]');
    $contentToHide.show();
    $contentToShow.hide();
    $this.on('click', function () {
      $contentToHide.hide();
      $contentToShow.show();
    });
  });
}

function checkboxToggleContent () {
  var $checkboxes = $('[data-checkbox-toggle]');
  var $toggleContents = $('[data-checkbox-toggle-content]'); // Return if $checkboxes doesn't exist

  if ($checkboxes.length === 0) {
    return;
  }

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

$(function () {
  svg4everybody();
  scrollSpy();
  navigation();
  dropdown();
  sidebar();
  popup();
  videoBox();
  select();
  tabs();
  mobileFooter();
  interTelInput();
  timetable();
  textAreaResize();
  timeRecorderMapPreview();
  timeRecorderMap();
  hideContent();
  switchContent();
  inputHighlight();
  inputAutoWidth();
  calendarPopupOpen();
  postImages();
  mediafiles();
  directory();
  newMessage();
  usersNearbyMap();
  range();
  catalogSlider();
  productDetailsSlider();
  contentHeader();
  foodShopProduct();
  contentScrollDesktop();
  contentScrollMobile();
  carShareRide();
  shopFinderMap();
  popupSwitcher();
  checkboxToggleContent();
}); // On window load

$(window).on('load', function () {});
