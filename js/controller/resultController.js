var ResultController = function(container) {
  var model;

  this.linkToRecipePage = container.find("img");

  this.setModel = function(newModel) {
    model = newModel;
  }

  var showRecipePageSegue = function() {
    console.log("fuck yyeah")
    model.showRecipePage();
  }
  
  this.linkToRecipePage.click(showRecipePageSegue);
}