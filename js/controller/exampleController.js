var ExampleController = function(container) {

	var model;

	this.setModel = function(newModel) {
		model = newModel;
	}
    
    var addGuest = function() {
        model.setNumberOfGuests(model.getNumberOfGuests() + 1)
    }

    var removeGuest = function() {
        model.setNumberOfGuests(model.getNumberOfGuests() - 1)
    }

    this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
    this.plusButton.click(addGuest)
    this.minusButton.click(removeGuest)
}