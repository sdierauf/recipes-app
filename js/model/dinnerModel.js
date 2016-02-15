var ViewManager = function() {
	var views = {};
	var activeViews = []; // list of viewNames that are active

	this.assertHasView = function(viewName) {
		if (!views[viewName]) {
			console.log(viewName + " wasn't in viewName -> view mapping!");
		}
	}

	this.registerView = function(viewName, viewRef) {
		views[viewName] = viewRef;
		console.log(viewName);
		console.log(viewRef);
	}

	this.hideView = function(viewName) {
		this.assertHasView(viewName);
		views[viewName].hide();
		activeViews.splice(activeViews.indexOf(viewName), 1);
	}

	this.hideActiveViews = function() {
		activeViews.forEach(function(viewName) {
			this.hideView(viewName);
		}, this);
	}

	this.forceHideAllViews = function() {
		// unclean way of destroying all views, do not use.
		activeViews = [];
		for (var name in views) {
			if (views.hasOwnProperty(name)) {
				views[name].hide();
			}
		}
	}

	this.showView = function(viewName) {
		this.assertHasView(viewName);
		views[viewName].show();
		activeViews.push(viewName);
	}

	this.showOnlyView = function(viewName) {
		this.hideActiveViews();
		this.showView(viewName);
	}

	this.getActiveViews = function() {
		var ret = []
		activeViews.forEach(function (viewName) {
			ret.push(views[viewName]);
		});
		return ret;
	}

	this.notifyViews = function(eventString, model) {
		this.getActiveViews().forEach(function (view) {
			console.log("each view")
			console.log(view);
			// Magic js ahead:
			if (view[eventString]) { // If the view implements view.eventString()
				console.log("calling view " + eventString);
				view[eventString](model) // call the function specified by eventString
				// passing a reference to this model
			}		
		});
	}

}


//DinnerModel Object constructor
var DinnerModel = function() {
 	
 	var viewManager = new ViewManager();
	// and selected dinner options for dinner menu
	this.numGuests = 0;
	this.menu = {};
	this.searchType = '';
	this.searchString = '';


	// Generic view controls 

	this.registerView = function(view, viewName) {
		if (viewName) {
			viewManager.registerView(viewName, view);
		}
		this.broadcastState();
	}

	this.showView = function(viewName) {
		viewManager.showView(viewName);
	}

	this.hideAllViews = function() {
		viewManager.forceHideAllViews();
	}

	this.notifyViews = function(eventString) {
		console.log("notifying")
		viewManager.notifyViews(eventString, this);
	}


	// Specific view segues (abstract out later)

	this.showCreateDinner = function() {
		viewManager.hideActiveViews();
		this.showView(VIEWS.SIDEBAR_VIEW);
		this.showView(VIEWS.SELECTOR_VIEW);
	}

	this.searchFood = function(searchTerm, category) {
		this.searchType = category;
		this.searchString = searchTerm;
		this.notifyViews(EVENTS.FILTER_FOOD);
	}


	// Actual dinner model stuff

	this.setNumberOfGuests = function(num) {
		this.numGuests = Math.max(num, 0);
		this.notifyViews(EVENTS.NUM_GUESTS_CHANGED);
	}

	// should return 
	this.getNumberOfGuests = function() {
		return this.numGuests
	}

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		return this.getDish(this.menu[type])
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		var menuDishes = []
		for (type in this.menu) {
			var dish = this.getDish(this.menu[type])
			if (dish) {
				menuDishes.push(dish)
			}
		}
		return menuDishes;
	}

	this.getCostOfDish = function(dish) {
		var totalPrice = 0;
		dish.ingredients.forEach(function(ingredient) {
			totalPrice += ingredient.price;
		});
		return totalPrice;
	}

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		var ingredients = [];
		this.getFullMenu().forEach(function (dish) {
			ingredients = ingredients.concat(dish.ingredients);
		})
		return ingredients;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var price = 0;
		this.getAllIngredients().forEach(function (ingredient) {
			price += ingredient.price;
		})
		price = price * this.numGuests;
		return price
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		var dish = this.getDish(id);
		if (!dish) return;
		if (this.menu[dish.type]) this.removeDishFromMenu(id);
		this.menu[dish.type] = id;
		this.notifyViews(EVENTS.DISH_CHANGED); 
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		var dish = this.getDish(id)
		if (!dish) return;
		if (this.menu[dish.type] != id) {
			console.log("tried to remove a dish that wasn't on the menu!");
			return;
		}
		this.menu[dish.type] = null;
		this.notifyViews(EVENTS.DISH_CHANGED); 
	}

	// Resync all views
	this.broadcastState = function() {
		this.notifyViews(EVENTS.NUM_GUESTS_CHANGED);
		this.notifyViews(EVENTS.DISH_CHANGED); 
	}

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type,filter) {
		return $(dishes).filter(function(index,dish) {
			var found = true;
			if(filter){
				found = false;
				$.each(dish.ingredients,function(index,ingredient) {
					if(ingredient.name.indexOf(filter)!=-1) {
						found = true;
					}
				});
				if(dish.name.indexOf(filter) != -1)
				{
					found = true;
				}
			}
			return dish.type == type && found;
		});	
	}

	this.betterGetAllDishes = function(type, match) {
		var ret = [];
		dishes.forEach(function (el) {
			if (dish.type == type) {
				if (match) {
					if (dish.name.indexOf(match) != -1) {
						
					}
				}
			}
		})

	}

	//function that returns a dish of specific ID
	this.getDish = function (id) {
	  for(key in dishes){
			if(dishes[key].id == id) {
				return dishes[key];
			}
		}
	}


	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

}