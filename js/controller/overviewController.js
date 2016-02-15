var overviewController = function(container){

	var model;
	var goBackAndEditDinner = container.find("#goBackAndEditDinnerButton");
	var listOfDinnerItems = [];

	this.setModel = function(newModel){
		model = newModel;
	}

	this.goBack = function(){
		model.set
	}

	this.getDinnerItems = function(){
		listOfDinnerItems = model.getFullMenu();
	}

	this.setDinnerItems = function(){
		this.getDinnerItems();
		
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


}