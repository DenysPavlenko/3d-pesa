export default function () {
  var $tabsContainers = $('.js-tabs');

  // Return if $tabsContainers doesn't exist
  if ($tabsContainers.length === 0) { return; }

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
