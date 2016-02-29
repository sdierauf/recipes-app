

// api wrapper

var APIWrapper = function(){
	var api_key = "18f3cT02U9f6yRl3OKDpP8NA537kxYKu";
	this.cache = [];

	this.getDish = function(id){

	}

	this.recipeSearch = function(searchTerm){
		/*var data = "none";
		var json = $.getJSON("http://api.bigoven.com/recipes?api_key=18f3cT02U9f6yRl3OKDpP8NA537kxYKu&title_kw=chicken&pg=1&rpp=20",*/
		var url = "http://api.bigoven.com/recipes?api_key=18f3cT02U9f6yRl3OKDpP8NA537kxYKu&title_kw=chicken&pg=1&rpp=20";
		$.ajax({
         type: "GET",
         dataType: 'json',
         cache: false,
         url: url,
         success: function (data) {
            console.log(data);
            }
         });


	}

}