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
    console.log("Ingredients loading");
    var i = dish.ingredients;
    this.ingredients.html("");
    i.forEach(function (ingr) {
      var s = "<div class='row'>";
      s += "<div class='col-xs-3'>" + (ingr.quantity * model.getNumberOfGuests()) + " " + ingr.unit + "</div>\
<div class='col-xs-5'>" + ingr.name + "</div>\
<div class='col-xs-2'>SEK</div>\
<div class='col-xs-2'>"+ (ingr.price * model.getNumberOfGuests()) +"</div></div>";
      this.ingredients.append(s);
    }, this); 
  }

  this[EVENTS.DISH_CHANGED] = function(model) { 
      this.updateSource = function(dish){ //Use as callback
        if (!dish) { console.log(' no dish ' + model.currentDishId()); return; }
        this.foodName.html(dish.name);
        this.foodImage.attr("src", dish.image);
        this.foodImage.attr("onerror", "images/" + dish.image);
        this.foodImage.attr("width", "100%");
        this.details.html(dish.description);
        this.loadIngredients(model, dish);
        this.totalCostOfRecipe.html(model.getCostOfDish(dish) * model.getNumberOfGuests());
      }.bind(this)
      
      var dish = model.getDish(model.currentDishId(), this.updateSource);
  }

  this[EVENTS.NUM_GUESTS_CHANGED] = function(model) {
      this.numPeopleForRecipe.html(model.getNumberOfGuests());
      var dish = model.getDish(model.currentDishId());
      if (!dish) return;
      this.loadIngredients(model, dish);
      this.totalCostOfRecipe.html(model.getCostOfDish(dish) * model.getNumberOfGuests());
  }

}