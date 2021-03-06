//DinnerModel Object constructor
var DinnerModel = function(newViewManager) {

	this.viewManager = newViewManager;
	this.bigOvenApi = new BigOvenApi();
	// and selected dinner options for dinner menu
	this.numGuests = 4;//Preset to 4
	this.menu = {};
	this.searchType = 'starter';
	this.searchString = '';

	this.notifyViews = function(eventString) {
		this.viewManager.notifyViews(eventString, this);
	}

	this.searchFood = function(searchTerm, category) {
		this.searchType = category;
		this.searchString = searchTerm;
		this.notifyViews(EVENTS.FILTER_FOOD);
	}

	this.currentDishId = function() {
		if (location.hash.indexOf(HASH.RECIPE) != -1) {
			return location.hash.split('-')[1];
		}
		return 0;
	}

	this.setNumberOfGuests = function(num) {
		this.numGuests = Math.max(num, 0);
		this.notifyViews(EVENTS.NUM_GUESTS_CHANGED);
	}

	// should return 
	this.getNumberOfGuests = function() {
		return this.numGuests
	}

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type, cb) {
		this.getDish(this.menu[type], cb)
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
		// console.log("Adding dish " + id)
		var dish = this.getDish(id);
		if (!dish) return;
		/*if (this.menu[dish.type]){
			// console.log("Same type " + dish.type);
			this.removeDishFromMenu(id);
		}*/
		this.menu[dish.type] = id;
		this.notifyViews(EVENTS.DISH_CHANGED);
		// console.log(this.menu) 
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		var dish = this.getDish(id)
		if (!dish) return;
		if (this.menu[dish.type] != id) {
			// console.log("tried to remove a dish that wasn't on the menu!");
			return;
		}
		this.menu[dish.type] = null;
		this.notifyViews(EVENTS.DISH_CHANGED); 
	}

	// Resync all views
	this.broadcastState = function() {
		for (event in EVENTS) {
			if (EVENTS.hasOwnProperty(event)) {
				this.notifyViews(event);
			}
		}
	}

	//Takes a dish in API format and renames attributes to fit our data
	var reattrDish = function(apidish){
		var newDish = {};
		newDish.name = apidish["Title"];
		newDish.id = apidish["RecipeID"];
		newDish.image = apidish["ImageURL"];
		newDish.type = apidish["Category"];
		newDish.instructions = apidish["Instructions"]
		if(apidish["Ingredients"]){ //This won't apply to dishes using the "search" method
			newDish.description = apidish["Description"]
			newDish.ingredients = []
			for(var i = 0; i < apidish["Ingredients"].length; i++){
				var ingr = apidish["Ingredients"][i];
				var ingr_new = {}
				ingr_new.name = ingr.Name
				ingr_new.quantity = Math.round(ingr.MetricQuantity) //Because fuck you imperial system
				ingr_new.unit = ingr.MetricUnit
				ingr_new.price = Math.round(ingr.MetricQuantity)
				newDish.ingredients.push(ingr_new)
			}
		}
		return newDish;
	}

	this.getApiDish = function(id, cb){
		//Have to do a seperate call to API for each dish ID

		var setDishAttr = function(dish){
			// console.log(dish)
			var newDish = reattrDish(dish);
			// console.log(newDish)
			dishes.push(newDish);
			cb(newDish);
		}

		this.bigOvenApi.getDish(id, setDishAttr);
		
	}

	this.getAllDishes = function(type, match, cb, model) {
		//Is there a way to search by type as well?

		var filterDishes = function(dishes) {
			var ret = [];
			dishes.Results.forEach(function (el) {
				var renamed_dish = reattrDish(el);
				ret.push(renamed_dish);
			});

			cb(ret, model);
		}
		this.bigOvenApi.getAllDishes(match, filterDishes);
		
	}

	//function that returns a dish of specific ID
	this.getDish = function (id, cb) {
		this.getApiDish(id, cb);
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
		'name':'Roast Chicken',
		'type':'main dish',
		'image':'roastchicken.jpg',
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
		'name':'Spring Greens',
		'type':'main dish',
		'image':'springgreens.jpg',
		'description':"Heat the oil in a large frying pan over a high heat. Add the chopped bacon and fry for 3-4 minutes, stirring regularly, until the fat has melted and the bacon is crisp and golden-brown.",
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
		'name':'Moroccan Vegetables',
		'type':'main dish',
		'image':'moroccan.jpg',
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
		'name':'Chocolate Ice cream',
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
		'image':'vanillaicecream.jpg',
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
		'image':'strawberryicecream.jpg',
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