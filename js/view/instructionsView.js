var InstructionsView = function(container){
	var listOfDinnerItems = [];
	
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
			buf += "<div class='col-md-2 col-md-offset-1' style='border:2px solid black; margin-top:30px;'>";
		    buf += "<img src='images/" + listOfDinnerItems[i].image + "''></img>";
		    buf += "</div>";
		    buf += "<div class='col-md-3 col-md-offset-1'>";
		    buf +=  "<h2>" + listOfDinnerItems[i].name + "</h2>";    
		    buf += "</div>";
		    buf +=  "<div class='col-md-3 col-md-offset-1'>";
		    buf += "<h3> Instructions</h3>";
		    buf += "<p style='font-size:80%;'> " + listOfDinnerItems[i].description + " </p>";
		    buf += "</div>"
		    buf += "</div>"
		} 
		var listing = container.find("#instructionsHolder");
		listing.html(buf);
	}

	this[EVENTS.DISH_CHANGED] = function(model) {
		this.setInstructions(model);
	}
}