var OverviewController = function(container) {

	var model;
	this.goBackAndEditDinner = container.find("#goBackAndEditDinnerButton");
	this.goToInstructionsButton = container.find("#instructButton");
	

	this.setModel = function(newModel){
		model = newModel;
	}

	var goBack = function(){
		model.dinnerEditSegue();
	}

	var goToInstructions = function(){
		model.showInstructions();
	}

	this.goBackAndEditDinner.click(goBack);
	this.goToInstructionsButton.click(goToInstructions);
	
}