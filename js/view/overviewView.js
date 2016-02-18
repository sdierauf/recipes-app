var OverviewView = function(container){
	this.peopleCounter = container.find("#peopleCounter");
	var listOfDinnerItems = [];


	this.show = function(){
		
		container.show();
	}
	this.hide = function() {
	    container.hide();
	  }

	this.getDinnerItems = function(model){
		listOfDinnerItems = model.getFullMenu();
	}

	this.setDinnerItems = function(model) {
		this.getDinnerItems(model);
		
		var buf = "";
		for(var i = 0; i < listOfDinnerItems.length; i++){
			console.log(listOfDinnerItems[i].name);
			buf += "<div class='col-md-2 col-sm-offset-1'>"
			buf += "<img src='images/'" + listOfDinnerItems[i].image + "width='100%''>";
			buf += "<p> " + listOfDinnerItems[i].name + "</p>";
			buf += "<p>" + model.getCostOfDish(listOfDinnerItems[i]) + " kr </p>";
			buf += "</div>"
		} 
		buf += "<div class='col-md-1' style='border-left: solid;'>\
				<p> Total: </p>\
				<p>" + model.getTotalMenuPrice() + " kr </p>\
			</div>";
		var listing = container.find("#listOfPlatters");
		console.log(buf);

		listing.html(buf);
	}

	this[EVENTS.DISH_CHANGED] = function(model) {
		console.log("Changing DISH");
		this.setDinnerItems(model);
	}

	this[EVENTS.NUM_GUESTS_CHANGED] = function(model) {
	    this.peopleCounter.html(model.getNumberOfGuests());
	}
	
}