//ExampleView Object constructor
var ExampleView = function (container) {

	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = container.find("#numberOfGuests");
	this.numberOfGuests.html("hello");

	this[EVENTS.NUM_GUESTS_CHANGED] = function(model) {
		console.log(model.getNumberOfGuests())
		this.numberOfGuests.html(model.getNumberOfGuests())
	}

	
}
 
