var InstructionsView = function(container){
	this.foodItems = container.find("#foodItems");
	
	this.show = function(){
		container.show();
	}
	this.hide = function(){
		container.hide();
	}

}