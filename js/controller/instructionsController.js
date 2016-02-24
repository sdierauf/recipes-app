var InstructionsController = function(container, newModel, newViewManager) {
	
	var model = newModel;
	var viewManager = newViewManager

	this.goBackAndEditDinner = container.find("#goBackAndEditDinner");

	var goBack = function(model){
		model.dinnerEditSegue();
	}

	this.goBackAndEditDinner.click(goBack);

}