var DishSelectorController = function(container, newModel, newViewManager) {
  var model = newModel;
  var viewManager = newViewManager;

  this.searchButton = container.find("#searchButton");
  this.searchInput = container.find("#searchInput");
  this.foodCategory = container.find("#foodCategory");

  var searchClicked = function() {

    var searchTerm = searchInput.value;
    var category = this.foodCategory.val();
    model.searchFood(searchTerm, category);

  }.bind(this);


  this.searchButton.click(searchClicked);

}