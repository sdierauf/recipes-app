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
    var category = this.foodCategory.val();
    console.log(searchTerm + " " + category);
    model.searchFood(searchTerm, category);

  }.bind(this);


  this.searchButton.click(searchClicked);

}