// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

  $scope.getDinnerMenu = function() {
    return Dinner.getMenu()
  }

  $scope.addDishToMenu = function(dish) {
    // not sure why we need this here...
  }

  $scope.getTotalMenuPrice = function() {
    var menu = Dinner.getMenu()
    if (menu.length == 0) return 0;
    var ingrs = menu.map(function (d) {return d.Ingredients}) // dishes -> Ingredients
    var flat = ingrs.reduce(function (a, b) { return a.concat(b)}) // flatten array
    var quantities = flat.map(function(d) { return d.Quantity } ) // Ingredient -> Quantity
    var sum = quantities.reduce(function (prev, cur) { return prev + cur * $scope.getNumberOfGuests()}) // Sum
    return sum;
  }

  $scope.totalCost = function(dish) {
    // return 10
    var ingrs = dish.Ingredients
    if (!ingrs) return 0;
    return ingrs
            .map(function(i) {return i.Quantity})
            .reduce(function(p, c){ return p + c * Dinner.getNumberOfGuests()})
  }

});