var OverviewController = function(container, newModel, newViewManager) {

	var model = newModel;
	var viewManager = newViewManager;

	this.goBackAndEditDinner = container.find("#goBackAndEditDinnerButton");
	this.goToInstructionsButton = container.find("#instructButton");
	
	var goBack = function(){
		model.dinnerEditSegue();
	}

	var goToInstructions = function(){
		model.showInstructions();
	}

	this.goBackAndEditDinner.click(goBack);
	this.goToInstructionsButton.click(goToInstructions);
	
}