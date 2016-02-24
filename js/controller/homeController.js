var HomeController = function(container, newModel, newViewManager) {
  
  var model = newModel;
  var viewManager = newViewManager;

  this.createDinnerButton = container.find("#createDinnerButton");

  var createDinnerSegue = function() {
    model.dinnerEditSegue();
  }

  this.createDinnerButton.click(createDinnerSegue);
}