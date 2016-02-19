var RecipeController = function(container) {
  var model;

  this.setModel = function(newModel) {
    model = newModel;
  }

  this.backToSelectDish = container.find("#backToSelectDish");
  this.confirmDish = container.find("#confirmDish");

  var backToSelectDishSegue = function() {
    model.dinnerEditSegue();
  }

  var addDishToMenu = function() {
    model.addDishToMenu(model.tempDishId);
    // The following is hacky but it clears the pending dish
    model.tempDishId = 0;
    model.notifyViews(EVENTS.DISH_CHANGED);
    // </hackiness>
    backToSelectDishSegue();
  }

  this.backToSelectDish.click(backToSelectDishSegue);
  this.confirmDish.click(addDishToMenu);
  
}