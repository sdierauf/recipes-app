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
    console.log(foods);
    foods.forEach(function (food) {
      var s = "<div class='col-sm-3'>\n"
      s += "<img src='images/icecream.jpg' width='100%'>\n"
      s += "<p style='background-color: rgb(221, 221, 221)'>" + food.name + "</p>\n"
      s += "<p> I see it, I want it, I stunt, yellow-bone it\
I dream it, I work hard, I grind 'til I own it";
      s += "</p>\n</div>\n";
      this.foodRepo.append(s);
      console.log("appended a food");
    }, this);
  }
}