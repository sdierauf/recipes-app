var ResultController = function(container, newModel, newViewManager, foodId) {
  
  var model = newModel;
  var viewManager = newViewManager;
  var id = foodId;

  this.linkToRecipePage = container.find("img");

  var showRecipeSegue = function() {
    model.showRecipe(id);
  }
  
  this.linkToRecipePage.click(showRecipeSegue);
  
}