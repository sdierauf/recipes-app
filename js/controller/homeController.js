var HomeController = function(container) {
  
  var model;
  this.createDinnerButton = container.find("#createDinnerButton");

  this.setModel = function(newModel) {
    model = newModel;
  }

  var createDinnerSegue = function() {
    model.dinnerEditSegue();
  }

  this.createDinnerButton.click(createDinnerSegue);
}