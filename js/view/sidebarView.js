var SidebarView = function(container) {
  
  this.peopleCounter = container.find("#peopleCounter");
  this.foodItems = container.find("#foodItems");
  this.agregateCost = container.find("#agregateCost");

  this.show = function() {
    container.show();
  }

  this.hide = function() {
    container.hide();
  }

  this.rebuildMenu = function(model) {
    this.foodItems.html("");  // clear table
    var dishes = model.getFullMenu();
    dishes.forEach(function (dish) {
      var row = "<tr><td>";
      row += dish.name;
      row += "</td><td>";
      row += model.getCostOfDish(dish);
      row += "</td></tr>\n";
      foodItems.append(row);
    });
  }

  // Event functions
  this[EVENTS.NUM_GUESTS_CHANGED] = function(model) {
    this.peopleCounter.html(model.getNumberOfGuests())
  }

  this[EVENTS.DISH_CHANGED] = function(model) {
    this.rebuildMenu(model);
    this.agregateCost.html(model.getTotalMenuPrice());
  }


}