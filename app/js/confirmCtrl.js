// Confirm controller used 
dinnerPlannerApp.controller('ConfirmCtrl', function ($scope,Dinner) {

  $scope.searchInput = '';
  $scope.searchResults;

  $scope.makeSearch = function() {
    $scope.searchResults = Dinner.searchDishes($scope.searchInput).get()
    console.log($scope.searchResults);
  }

  $scope.getDinnerMenu = function() {
    return Dinner.getMenu()
  }

});