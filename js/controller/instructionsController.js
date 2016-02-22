var InstructionsController = function(container){
	var model;
	this.goBackAndEditDinner = container.find("#goBackAndEditDinner");

	this.setModel = function(newModel){
		model = newModel;
	}

	var goBack = function(model){
		model.dinnerEditSegue();
	}

	this.goBackAndEditDinner.click(goBack);

}