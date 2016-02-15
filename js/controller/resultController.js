var ResultController = function(container, foodId) {
  var model;
  var id = foodId;

  this.linkToRecipePage = container.find("img");

  this.setModel = function(newModel) {
    model = newModel;
  }

  var showRecipeSegue = function() {
    model.lastDishId = id;
    model.showRecipe();
  }
  
  this.linkToRecipePage.click(showRecipeSegue);
}