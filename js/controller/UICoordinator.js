var ViewManager = function() {
  var views = {};
  // var activeViews = []; // list of viewNames that are active

  this.assertHasView = function(viewName) {
    if (!views[viewName]) {
      console.log(viewName + " wasn't in viewName -> view mapping!");
    }
  }

  this.registerView = function(viewName, viewRef) {
    views[viewName] = viewRef;
  }

  this.hideAllViews = function() {
    this.getViews().forEach(function(view) {
      view.hide();
    })
  }

  this.showView = function(viewName) {
    this.assertHasView(viewName);
    views[viewName].show();
  }

  this.getViews = function() {
    var ret = []
    for (var name in views) {
      if (views.hasOwnProperty(name)) {
        ret.push(views[name]);
      }
    }
    return ret;
  }

  this.notifyViews = function(eventString, model) {
    this.getViews().forEach(function (view) {
      // Magic js ahead:
      if (view[eventString]) { // If the view implements view.eventString()
        console.log("calling view " +  eventString);
        view[eventString](model) // call the function specified by eventString
        // passing a reference to this model
      }   
    });
  }

}


var UICoordinator = function() {
  var model;
  var viewManager = new ViewManager();

  this.setModel = function(newModel) {
    model = newModel;
  }

  // Generic view controls 

  this.registerView = function(view, viewName) {
    if (viewName) {
      viewManager.registerView(viewName, view);
    }
    this.broadcastState();
  }

  this.showView = function(viewName) {
    viewManager.showView(viewName);
  }

  this.hideAllViews = function() {
    viewManager.hideAllViews();
  }

  this.notifyViews = function(eventString) {
    viewManager.notifyViews(eventString, this);
  }

  // Specific view segues (abstract out later)

  this.showRecipe = function(id) {
    location.hash = HASH.RECIPE + '-' + id;
    this.hideAllViews();
    this.showView(VIEWS.SIDEBAR_VIEW);
    this.showView(VIEWS.RECIPE_VIEW);
    this.notifyViews(EVENTS.DISH_CHANGED);
  }

  this.dinnerEditSegue = function(){
    location.hash = HASH.SEARCH;
    this.hideAllViews();
    this.showView(VIEWS.SIDEBAR_VIEW);
    this.showView(VIEWS.SELECTOR_VIEW);
    this.notifyViews(EVENTS.DISH_CHANGED);
  }

  this.showDinnerOverview = function() {
    this.hideAllViews();
    this.showView(VIEWS.OVERVIEW_VIEW);
    location.hash = HASH.OVERVIEW;
  }

  this.showInstructions = function() {
    this.hideAllViews();
    this.showView(VIEWS.INSTRUCTIONS_VIEW);
    location.hash = HASH.INSTRUCTIONS;
  }

  this.searchFood = function(searchTerm, category) {
    this.searchType = category;
    this.searchString = searchTerm;
    this.notifyViews(EVENTS.FILTER_FOOD);
    location.hash = HASH.SEARCH;
  }

  this.showHomeView = function() {
    this.hideAllViews();
    this.showView(VIEWS.HOME_VIEW);
    location.hash = HASH.HOME;
  }

}