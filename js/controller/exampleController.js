var ExampleController = function(container) {

	var model;

	this.setModel = function(newModel) {
		model = newModel;
	}
    
    this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
    this.idInput = container.find("#foodIdInput");
    this.addId = container.find("#addButton");

    var addGuest = function() {
        model.setNumberOfGuests(model.getNumberOfGuests() + 1)
    }

    var removeGuest = function() {
        model.setNumberOfGuests(model.getNumberOfGuests() - 1)
    }

    var addFoodById = function() {
        var num = Number(this.idInput.val());
        if (!num) return;
        model.addDishToMenu(num);
        this.idInput.val('');
    }.bind(this)  // fucking js scope...

    this.plusButton.click(addGuest);
    this.minusButton.click(removeGuest);
    this.addId.click(addFoodById);
}