var DishSelectorView = function(container) {
  
  this.show = function() {
    container.show();
  }

  this.hide = function() {
    container.hide();
  }

  this.foodRepo = container.find("#foodRepo");

  this[EVENTS.FILTER_FOOD] = function(model) {
    console.log("filtering fooooood");
    var foods = model.betterGetAllDishes(
      model.searchType, model.searchString);
    this.foodRepo.html("")
    if (!foods) {
      return;
    }
    foods.forEach(function (food) {
      // create a view-controller for each result.
      var s = "<div class='col-sm-3' id='f"+ food.id + "' style='flex=1';>\n"
      s += "<div style='border:2px solid black; padding: 10px;'> "
      s += "<img src='images/" + food.image + "' width='100%'>\n"
      s += "<p style='background-color: rgb(221, 221, 221)'; text-align:center;>" + food.name + "</p></div>\n"
      s += "<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore";
      s += "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
      s += "</p>\n</div>\n";
      console.log(s);
      this.foodRepo.append(s);
      var resultController = new ResultController($("#f" + food.id), food.id);
      resultController.setModel(model);
    }, this);
  }
}