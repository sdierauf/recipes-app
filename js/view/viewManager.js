var ViewManager = function() {

	var views = {
		'ViewManager': this  // this can implement EVENTS!
	};

	this.assertHasView = function(viewName) {
		if (!views[viewName]) {
			console.log(viewName + " wasn't in viewName -> view mapping!");
		}
	}

	this.registerView = function(viewRef, viewName) {
		views[viewName] = viewRef;
	}

	this.hideAllViews = function() {
		this.getViews().forEach(function(view) {
			if (view.hide) {
				view.hide();
			}
		});
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
				view[eventString](model) // call the function specified by eventString
				// passing a reference to this model
			}		
		});
	}


	this.showRecipe = function(id) {
		location.hash = HASH.RECIPE + '-' + id;
		this.hideAllViews();
		this.showView(VIEWS.SIDEBAR_VIEW);
		this.showView(VIEWS.RECIPE_VIEW);
	}

	this.dinnerEditSegue = function(){
		this.hideAllViews();
		this.showView(VIEWS.SIDEBAR_VIEW);
		this.showView(VIEWS.SELECTOR_VIEW);
		location.hash = HASH.SEARCH;
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

	this.showHomeView = function() {
		this.hideAllViews();
		this.showView(VIEWS.HOME_VIEW);
		location.hash = HASH.HOME;
	}

	// See a self-reference is useful
	this[EVENTS.FILTER_FOOD] = function() {
		location.hash = HASH.SEARCH;
	}

}