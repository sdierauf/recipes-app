$(function() {


	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var exampleView = new ExampleView($("#exampleView"));
	var exampleController = new ExampleController($("#exampleView"))

	// Register Models to Controllers
	exampleController.setModel(model)

	// Register Views
	model.registerView(exampleView)

	// var viewManager = new ViewManager();

});


// GLOBAL
// Event constants should be listed here
EVENTS = {
	NUM_GUESTS_CHANGED: "numGuestsChanged",
	DISH_CHANGED: "dishChanged",
}

function ViewManager() {
	var views = {};
	var activeViews = []; // list of viewNames that are active

	this.assertHasView = function(viewName) {
		if (!views[viewName]) {
			console.log(viewName + " wasn't in viewName -> view mapping!");
		}
	}

	this.registerView = function(viewName, viewRef) {
		views[viewName] = viewRef;
	}

	this.hideView = function(viewName) {
		this.assertHasView(viewName);
		views[viewName].hide();
		activeViews.splice(activeViews.indexOf(viewName), 1);
	}

	this.hideActiveViews = function() {
		activeViews.forEach(function(viewName) {
			this.hideView(viewName);
		}, this);
	}

	this.showView = function(viewName) {
		this.assertHasView(viewName);
		views[viewName].show();
		activeViews.push(viewName);
	}

	this.showOnlyView = function(viewName) {
		this.hideActiveViews();
		this.showView(viewName);
	}

}