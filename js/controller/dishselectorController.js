var DishSelectorController = function(container) {
  var model;

  this.setModel = function(newModel) {
    model = newModel;
  }

  this.searchButton = container.find("#searchButton");
  this.searchInput = container.find("#searchInput");
  this.foodCategory = container.find("#foodCategory");

  var searchClicked = function() {

    var searchTerm = searchInput.value;
    this.searchInput.value;
    var category = this.foodCategory.val();
    model.searchFood(searchTerm, category);

  }.bind(this);


  this.searchButton.click(searchClicked);

}