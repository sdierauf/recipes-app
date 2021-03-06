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
    // console.log(dishes);
    dishes.forEach(function (dish) {
      var row = "<tr><td>";
      row += dish.name;
      row += "</td><td>";
      row += model.getCostOfDish(dish);
      row += "</td></tr>\n";
      this.foodItems.append(row);
    }, this);
    //append pending?
    /*if (model.currentDishId() != 0 &&
        !model.getFullMenu().map(function(dish) {return dish.id}).includes(Number(model.currentDishId()))) {
      var dish = model.getDish(model.currentDishId());
      this.foodItems.append("<tr><td>pending: " + dish.name + "</td><td>" + model.getCostOfDish(dish) + "</td></tr>");
    }*/
  }

  // Event functions
  this[EVENTS.NUM_GUESTS_CHANGED] = function(model) {
    this.peopleCounter.html(model.getNumberOfGuests());
    this.agregateCost.html(model.getTotalMenuPrice());
  }

  this[EVENTS.DISH_CHANGED] = function(model) {
    // console.log("event update from sidebar view");
    this.rebuildMenu(model);
    this.agregateCost.html(model.getTotalMenuPrice());
  }


}