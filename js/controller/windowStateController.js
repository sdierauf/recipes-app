var WindowStateController = function(newModel, newViewManager) {

  var model = newModel;
  var viewManager = newViewManager

  var locationHashChange = function() {
    switch(location.hash.substring(1)) {  // remove the hashtag from the string

      case HASH.HOME:
        viewManager.showHomeView();
        break;

      case HASH.SEARCH:
        viewManager.dinnerEditSegue();
        break;

      case HASH.OVERVIEW:
        viewManager.showDinnerOverview();
        break;

      case HASH.INSTRUCTIONS:
        viewManager.showInstructions();
        break;
       
      default:
        if (location.hash.indexOf(HASH.RECIPE) != -1) {
          // lol refactor this
          var hash = location.hash;
          var pieces = hash.split('-');
          viewManager.showRecipe(pieces[1]);
          model.notifyViews(EVENTS.DISH_CHANGED);
        } else {
          viewManager.showHomeView();
        }
    }

  }

  this.checkHashOnInit = function() {
    locationHashChange();
  }

  window.addEventListener('hashchange', locationHashChange)
}