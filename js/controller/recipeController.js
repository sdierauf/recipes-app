var RecipeController = function(container, newModel, newViewManager) {

  var model = newModel;
  var viewManager = newViewManager;

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