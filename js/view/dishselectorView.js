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
    var foods = model.getAllDishes(
      model.searchType, model.searchString);
    this.foodRepo.html("")
    if (!foods) {
      return;
    }
    $.each(foods, function (food) {
      var s = "<div class='col-sm-2'>\n"
      s += "<img src=''>\n"
      s += "<p style='background-color: rgb(221, 221, 221)'>" + food.name + "</p>\n"
      s += "<p> I see it, I want it, I stunt, yellow-bone it\
I dream it, I work hard, I grind 'til I own it\
I twirl on them haters, albino alligators\
El Camino with the seat low, sippin' Cuervo with no chaser\
Sometimes I go off (I go off), I go hard (I go hard)\
Get what's mine (take what's mine), I'm a star (I'm a star)\
Cause I slay (slay), I slay (hey), I slay (okay), I slay (okay)\
All day (okay), I slay (okay), I slay (okay), I slay (okay)\
We gon' slay (slay), gon' slay (okay), we slay (okay), I slay (okay)"
      s += "</p>\n</div>\n";
      this.foodRepo.append(s);
      console.log("appended a food");
    }, this)
  }
}