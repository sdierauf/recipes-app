var RecipeView = function(container) {

  this.foodName = container.find("#foodName");
  this.foodImage = container.find("#foodImage");
  this.details = container.find("#details");
  this.ingredients = container.find("#ingredientsList");
  this.numPeopleForRecipe = container.find("#recipeNumPeople");
  this.totalCostOfRecipe = container.find("#totalCostOfRecipe");

  
  this.show = function() {
    container.show();
  }

  this.hide = function() {
    container.hide();
  }

  this.loadIngredients = function(model, dish) {
    var i = dish.ingredients;
    this.ingredients.html("");
    i.forEach(function (ingr) {
      var s = "<div class='row'>";
      s += "<div class='col-xs-3'>" + ingr.quantity + " " + ingr.unit + "</div>\
<div class='col-xs-5'>" + ingr.name + "</div>\
<div class='col-xs-2'>SEK</div>\
<div class='col-xs-2'>"+ ingr.price +"</div></div>";
      this.ingredients.append(s);
    }, this); 
  }

  this[EVENTS.DISH_CHANGED] = function(model) {
    var dish = model.getDish(model.lastDishId);
    if (!dish) return;
    this.foodName.html(dish.name);
    this.foodImage.attr("src", "images/" + dish.image);
    this.details.html(dish.description);
    this.loadIngredients(model, dish);
    this.totalCostOfRecipe.html(model.getCostOfDish(dish));
    // this.numPeopleForRecipe.html(model.)
  }

  

}