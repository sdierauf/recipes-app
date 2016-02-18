var OverviewController = function(container) {

	var model;
	this.goBackAndEditDinner = container.find("#goBackAndEditDinnerButton");
	

	this.setModel = function(newModel){
		model = newModel;
	}

	var goBack = function(){
		model.dinnerEditSegue();
	}

	this.goBackAndEditDinner.click(goBack);

}