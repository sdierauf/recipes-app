// Confirm controller used 
dinnerPlannerApp.controller('ConfirmCtrl', function ($scope,Dinner) {

  $scope.searchInput = '';
  $scope.searchResults;
  $scope.menu;

  $scope.makeSearch = function() {
    $scope.searchResults = Dinner.searchDishes($scope.searchInput).get()
    console.log($scope.searchResults);
  }

  $scope.getDinnerMenu = function() {
  	console.log(Dinner.getMenu())
    return Dinner.getMenu()
  }

});