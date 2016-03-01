var RecipeController = function(container, newModel, newViewManager) {

  var model = newModel;
  var viewManager = newViewManager;

  this.backToSelectDish = container.find("#backToSelectDish");
  this.confirmDish = container.find("#confirmDish");

  var backToSelectDishSegue = function() {
    viewManager.dinnerEditSegue();
  }

  var addDishToMenu = function() {
    var id = model.currentDishId();
    console.log("ID is " + id)
    model.addDishToMenu(id);
    backToSelectDishSegue();
  }

  this.backToSelectDish.click(backToSelectDishSegue);
  this.confirmDish.click(addDishToMenu);
  
}