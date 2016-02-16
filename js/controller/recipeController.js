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
    model.addDishToMenu(model.lastDishId);
    backToSelectDishSegue();
  }

  this.backToSelectDish.click(backToSelectDishSegue);
  this.confirmDish.click(addDishToMenu);
  
}