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
    return Dinner.getTotalMenuPrice();
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