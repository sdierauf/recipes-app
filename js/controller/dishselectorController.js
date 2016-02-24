var DishSelectorController = function(container) {
  var model;

  this.setModel = function(newModel) {
    model = newModel;
  }

  this.searchButton = container.find("#searchButton");
  this.foodCategory = container.find("#foodCategory");

  this.updateValues = function(){
    console.log("updatign vlafdaskjjklfds");
    var searchTerm = searchInput.value;
    var category = this.foodCategory.val();
    model.searchFood(searchTerm, category);
  }

  $( "#searchInput ").keyup(function(){
    this.updateValues();
  }.bind(this))

  $( '#foodCategory').change(function(){
    this.updateValues();
  }.bind(this))
  
}