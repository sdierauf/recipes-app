var HomeView = function(container) {

  this.hide = function() {
    console.log("hiding home view");
    container.hide();
  }

  this.show = function() {
    container.show();
  }

}