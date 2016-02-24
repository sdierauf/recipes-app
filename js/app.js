$(function() {


	// We instantiate our model
	var model = new DinnerModel();
	var viewManager = new ViewManager(model);

	// Add WindowStateController;
	var windowStateController = new WindowStateController();
	windowStateController.setModel(model);
	
	// And create the needed controllers and views
	// var exampleView = new ExampleView($("#exampleView"));
	// var exampleController = new ExampleController($("#exampleView"));
	// var overviewView = new OverviewController($("overviewView"));
	// var overviewController = new OverviewController($("overviewView"));

	var homeView = new HomeView($("#homeView"));
	var homeController = new HomeController($("#homeView"), model, viewManager);

	var dishSelectorView = new DishSelectorView($("#dishselectorView"));
	var dishSelectorController = new DishSelectorController($("#dishselectorView"), model, viewManager);

	var sidebarView = new SidebarView($("#sidebarView"));
	var sidebarController = new SidebarController($("#sidebarView"), model, viewManager);

	var recipeView = new RecipeView($("#recipeView"));
	var recipeController = new RecipeController($("#recipeView"), model, viewManager);

	var overviewView = new OverviewView($("#overviewView"));
	var overviewController = new OverviewController($("#overviewView"), model, viewManager);

	var instructionsView = new InstructionsView($("#instructionsView"));
	var instructionsController = new InstructionsController($("#instructionsView"), model, viewManager);

	// Register Views
	viewManager.registerView(homeView, VIEWS.HOME_VIEW);
	viewManager.registerView(dishSelectorView, VIEWS.SELECTOR_VIEW);
	viewManager.registerView(recipeView, VIEWS.RECIPE_VIEW);
	viewManager.registerView(sidebarView, VIEWS.SIDEBAR_VIEW);
	viewManager.registerView(overviewView, VIEWS.OVERVIEW_VIEW);
	viewManager.registerView(instructionsView, VIEWS.INSTRUCTIONS_VIEW);

	// Init
	viewManager.hideAllViews();
	windowStateController.checkHashOnInit();

});


// GLOBAL
// Event constants should be listed here
EVENTS = {
	NUM_GUESTS_CHANGED: "numGuestsChanged",
	DISH_CHANGED: "dishChanged",
	FILTER_FOOD: "filterFood"
}

VIEWS = {
	EXAMPLE_VIEW: "exampleView",
	SELECTOR_VIEW: "dishSelectorView",
	RECIPE_VIEW: "recipeView",
	SIDEBAR_VIEW: "sidebarView",
	HOME_VIEW: "homeView",
	OVERVIEW_VIEW: "overviewView",
	HEADER_VIEW: "headerView",
	INSTRUCTIONS_VIEW: "instructionsView"
}

HASH = {
	HOME: 'home',
	RECIPE: 'recipe',
	SEARCH: 'search',
	OVERVIEW: 'overview',
	INSTRUCTIONS: 'instructions'
}
