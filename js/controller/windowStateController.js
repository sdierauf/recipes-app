var WindowStateController = function(newModel, newViewManager) {

  var model = newModel;
  var viewManager = newViewManager

  var locationHashChange = function() {
    switch(location.hash.substring(1)) {  // remove the hashtag from the string

      case HASH.HOME:
        model.showHomeView();
        break;

      case HASH.SEARCH:
        model.dinnerEditSegue();
        break;

      case HASH.OVERVIEW:
        model.showDinnerOverview();
        break;

      case HASH.INSTRUCTIONS:
        model.showInstructions();
        break;
       
      default:
        if (location.hash.indexOf(HASH.RECIPE) != -1) {
          // lol refactor this
          var hash = location.hash;
          var pieces = hash.split('-');
          model.showRecipe(pieces[1]);
        } else {
          model.showHomeView();
        }
    }

  }

  this.checkHashOnInit = function() {
    locationHashChange();
  }

  window.addEventListener('hashchange', locationHashChange)
}