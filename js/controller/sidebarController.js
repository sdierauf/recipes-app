var SidebarController = function(container, newModel, newViewManager) {
  var model = newModel;
  var viewManager = newViewManager;

  this.plusPeople = container.find("#plusPeople");
  this.minusPeople = container.find("#minusPeople");
  this.confirmDinnerButton = container.find("#confirmDinner");

  var addGuest = function() {
    model.setNumberOfGuests(model.getNumberOfGuests() + 1);
  }

  var removeGuest = function() {
    model.setNumberOfGuests(model.getNumberOfGuests() - 1);
  }

  var confirmDinnerSegue = function() {
    model.showDinnerOverview();
  }
  
  this.plusPeople.click(addGuest);
  this.minusPeople.click(removeGuest);
  this.confirmDinnerButton.click(confirmDinnerSegue);
}