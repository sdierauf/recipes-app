var ResultController = function(container) {
  var model;

  this.linkToRecipePage = container.find("img");

  this.setModel = function(newModel) {
    model = newModel;
  }

  var showRecipeSegue = function() {
    console.log("fuck yyeah")
    model.showRecipe();
  }
  
  this.linkToRecipePage.click(showRecipeSegue);
}