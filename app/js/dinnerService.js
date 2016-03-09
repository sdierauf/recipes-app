// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  
  var numberOfGuest = 2;
  var menu = [];

  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
  }

  this.getNumberOfGuests = function() {
    return numberOfGuest;
  }


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

  this.getTotalMenuPrice = function() {
    if (menu.length == 0) return 0;
    var ingrs = menu.map(function (d) {return d.Ingredients}) // dishes -> Ingredients
    var flat = ingrs.reduce(function (a, b) { return a.concat(b)}) // flatten array
    var quantities = flat.map(function(d) { return d.Quantity } ) // Ingredient -> Quantity
    var sum = quantities.reduce(function (prev, cur) { return prev + cur * numberOfGuest}) // Sum
    return sum;
  }


  this.getDish = function(dishId) {
    return $resource(
        'http://api.bigoven.com/recipe/:id',
        {id: dishId},
        {get: { method: 'GET', 
                params: {
                  api_key: '18f3cT02U9f6yRl3OKDpP8NA537kxYKu',
                  pg: 1,
                  rpp: 10
                }
              }
        })
  }

  this.searchDishes = function(search) {
    return $resource(
        'http://api.bigoven.com/recipes/',
        {},
        {get: { method: 'GET', 
                params: {
                  api_key: '8vtk7KykflO5IzB96kb0mpot0sU40096',
                  pg: 1,
                  rpp: 5,
                  any_kw: search
                }
              }
        })
  }

  this.addDishToMenu = function(dish) {
    menu.push(dish)
  }

  this.getMenu = function() {
    return menu
  }

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});