$(function() {


	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var exampleView = new ExampleView($("#exampleView"));
	var exampleController = new ExampleController($("#exampleView"), model)

	//Register Views
	model.registerView(exampleView)

});


// GLOBAL
// Event constants should be listed here
EVENTS = {
	NUM_GUESTS_CHANGED: "numGuestsChanged"
}