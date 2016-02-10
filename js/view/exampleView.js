//ExampleView Object constructor
var ExampleView = function (container) {

	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = container.find("#numberOfGuests");
	this.menuList = container.find("#dishesMenu");
	this.cost = container.find("#totalCost");

	this.rebuildMenu = function(menu) {
		this.menuList.html("");
		menu.forEach(function (item) {
			console.log(item.name);
			var listItem = "<li>" + item.name + "</li>"
			this.menuList.append(listItem);
		}, this);
	}

	this[EVENTS.NUM_GUESTS_CHANGED] = function(model) {
		console.log("num guests changed");
		this.numberOfGuests.html(model.getNumberOfGuests())
	}

	this[EVENTS.DISH_CHANGED] = function(model) {
		this.rebuildMenu(model.getFullMenu())
		this.cost.html(model.getTotalMenuPrice())
	}

	
}
 
