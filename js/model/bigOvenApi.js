var BigOvenApi = function() {
  var apiKeys = [
    {
      key: 'r02x0R09O76JMCMc4nuM0PJXawUHpBUL',
      expired: false
    },
    {
      key: '1hg3g4Dkwr6pSt22n00EfS01rz568IR6',
      expired: false
    },
    {
      key: '8vtk7KykflO5IzB96kb0mpot0sU40096',
      expired: false
    },
    {
      key: '18f3cT02U9f6yRl3OKDpP8NA537kxYKu',
      expired: false
    }
  ];

  var origin = 'http://api.bigoven.com/';

  var dishCache = {};

  this.wrapCb = function(cb) {
    return function() {
      var parsed = JSON.parse(this.responseText)
      cb(parsed)
    }
  }

  this.getDish = function(id, cb) {
    if (dishCache[id]) {
      cb(dishCache[id])
    } else {
      this.queryBigOven(
        origin + 'recipe/' + id + '/' + this.composeParams({
          'api_key': this.getKey(),
          'pg': 1,
          'rpp': 10
        }),
        cb);
    }
  }

  this.getAllDishes = function(keyword, cb) {
    this.queryBigOven(
      origin + 'recipes/' + this.composeParams({
        'api_key': this.getKey(),
        'pg': 1,
        'rpp': 10,
        'any_kw': keyword
      }),
      cb)
  }

  this.getKey = function() {
    for (var i = 0; i < apiKeys.length; i++) {
      if (!apiKeys[i].expired) {
        return apiKeys[i].key;
      }
    }
  }

  this.composeParams = function(params) {
    return '?' + Object.keys(params).map(function(paramKey) { return paramKey + "=" + params[paramKey] }).join('&')
  }

  this.queryBigOven = function(url , cb) {
    console.log("Sending request " + url);
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.setRequestHeader('Accept', 'application/json');
    req.addEventListener('load', this.wrapCb(cb));
    req.send();
  }



}