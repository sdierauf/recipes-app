// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  $scope.getDishId = function() {
    console.log('getDishId')
    return $routeParams.dishId
  }

  $scope.getDish = function() {
    return Dinner.getDish(this.getDishId()).get()
  }

  $scope.currentDish = $scope.getDish()
  $scope.guests = Dinner.getNumberOfGuests()

  $scope.totalCost = function() {
    // return 10
    var ingrs = $scope.currentDish.Ingredients
    if (!ingrs) return 0;
    return ingrs
            .map(function(i) {return i.Quantity})
            .reduce(function(p, c){ return p + c * Dinner.getNumberOfGuests()})
  }

  $scope.confirmDish = function() {
    Dinner.addDishToMenu($scope.currentDish)
  }


  return this;
  
});