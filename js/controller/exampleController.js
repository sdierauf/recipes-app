var ExampleController = function(container, model) {
    
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