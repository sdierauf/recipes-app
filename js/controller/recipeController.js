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
    var id = model.currentDishId();
    backToSelectDishSegue();
    model.addDishToMenu(id);
  }

  this.backToSelectDish.click(backToSelectDishSegue);
  this.confirmDish.click(addDishToMenu);
  
}