// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.

  $scope.searchInput = '';
  $scope.searchResults;

  $scope.makeSearch = function() {
    $scope.searchResults = Dinner.searchDishes($scope.searchInput).get()
    console.log($scope.searchResults);
  }

});