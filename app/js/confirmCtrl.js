// Confirm controller used 
dinnerPlannerApp.controller('ConfirmCtrl', function ($scope,Dinner) {

  $scope.searchInput = '';
  $scope.searchResults;
  $scope.menu;
  $scope.totalCost;

  $scope.makeSearch = function() {
    $scope.searchResults = Dinner.searchDishes($scope.searchInput).get()
  }

  $scope.getDinnerMenu = function() {
  	$scope.totalCost = Dinner.getTotalMenuPrice()
    return Dinner.getMenu()
  }

});