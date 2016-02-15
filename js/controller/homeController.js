var HomeController = function(container) {
  
  var model;
  this.createDinnerButton = container.find("#createDinnerButton");

  this.setModel = function(newModel) {
    model = newModel;
  }

  var createDinnerSegue = function() {
    model.showCreateDinner();
  }

  this.createDinnerButton.click(createDinnerSegue);

}