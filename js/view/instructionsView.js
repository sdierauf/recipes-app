var InstructionsView = function(container){
	var listOfDinnerItems = [];
	this.numPeople = container.find("peopleInst");
	
	this.show = function(){
		container.show();
	}
	this.hide = function(){
		container.hide();
	}

	this.getDinnerItems = function(model){
		listOfDinnerItems = model.getFullMenu();
	}

	this.setInstructions = function(model){
		this.getDinnerItems(model);
		var buf = "";
		for(var i = 0; i < listOfDinnerItems.length; i++){
			buf += "<div class='row'>"
			buf += "<div class='col-md-2 col-md-offset-1 instruction'>";
		    buf += "<img src='" + listOfDinnerItems[i].image + "' onerror='images/" + listOfDinnerItems[i].image + "'' width='100%''>"
		    buf += "</div>";
		    buf += "<div class='col-md-3 col-md-offset-1'>";
		    buf +=  "<h2>" + listOfDinnerItems[i].name + "</h2>";    
		    buf += "</div>";
		    buf +=  "<div class='col-md-3 col-md-offset-1'>";
		    buf += "<h3> Instructions</h3>";
		    buf += "<p style='font-size:80%;'> " + listOfDinnerItems[i].instructions + " </p>";
		    buf += "</div>"
		    buf += "</div>"
		} 
		var listing = container.find("#instructionsHolder");
		listing.html(buf);
	}

	this[EVENTS.DISH_CHANGED] = function(model) {
		this.setInstructions(model);
	}

	this[EVENTS.NUM_GUESTS_CHANGED] = function(model){
		this.numPeople.html = model.getNumberOfGuests();
	}
}