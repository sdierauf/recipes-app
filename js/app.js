$(function() {


	// We instantiate our model
	var model = new DinnerModel();
	
	// And create the needed controllers and views
	// var exampleView = new ExampleView($("#exampleView"));
	// var exampleController = new ExampleController($("#exampleView"));
	var homeView = new HomeView($("#homeView"));
	var homeController = new HomeController($("#homeView"));

	var dishSelectorView = new DishSelectorView($("#dishselectorView"));
	var dishSelectorController = new DishSelectorController($("#dishselectorView"));

	var sidebarView = new SidebarView($("#sidebarView"));
	var sidebarController = new SidebarController($("#sidebarView"));

	var recipeView = new RecipeView($("#recipeView"));
	var recipeController = new RecipeController($("#recipeView"))

	// Register Models to Controllers
	homeController.setModel(model);
	dishSelectorController.setModel(model);
	sidebarController.setModel(model);
	recipeController.setModel(model);


	// Register Views
	model.registerView(homeView, VIEWS.HOME_VIEW);
	model.registerView(dishSelectorView, VIEWS.SELECTOR_VIEW);
	model.registerView(recipeView, VIEWS.RECIPE_VIEW);
	model.registerView(sidebarView, VIEWS.SIDEBAR_VIEW);

	// Init
	model.hideAllViews();
	model.showView(VIEWS.HOME_VIEW);


});


// GLOBAL
// Event constants should be listed here
EVENTS = {
	NUM_GUESTS_CHANGED: "numGuestsChanged",
	DISH_CHANGED: "dishChanged",
}

VIEWS = {
	EXAMPLE_VIEW: "exampleView",
	SELECTOR_VIEW: "dishSelectorView",
	RECIPE_VIEW: "recipeView",
	SIDEBAR_VIEW: "sidebarView",
	HOME_VIEW: "homeView"
}