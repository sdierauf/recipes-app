var OverviewView = function(container){
	this.peopleCounter = container.find("#people");
	var listOfDinnerItems = [];


	this.show = function() {
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
			buf += "<div class='col-md-2 col-sm-offset-1'>"
			buf += "<img src='" + listOfDinnerItems[i].image + "' onerror='images/" + listOfDinnerItems[i].image + "'' width='100%''>";
			buf += "<p> " + listOfDinnerItems[i].name + "</p>";
			buf += "<p>" + model.getCostOfDish(listOfDinnerItems[i]) + " kr </p>";
			buf += "</div>"
		}
		var klass = 'col-md-1';
		if (listOfDinnerItems.length == 0) klass += ' col-md-offset-1';
		buf += "<div class='" + klass + "' style='border-left: solid;'>\
				<p> Total: </p>\
				<p>" + model.getTotalMenuPrice() + " kr </p>\
			</div>";
		var listing = container.find("#listOfPlatters");

		listing.html(buf);
	}

	this[EVENTS.DISH_CHANGED] = function(model) {
		this.setDinnerItems(model);
	}

	this[EVENTS.NUM_GUESTS_CHANGED] = function(model) {
	    this.peopleCounter.html(model.getNumberOfGuests());
	    this.setDinnerItems(model);
	}
	
}