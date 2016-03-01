var BigOvenApi = function() {
  var apiKeys = [
    {
      key: 'r02x0R09O76JMCMc4nuM0PJXawUHpBUL',
      expired: true
    },
    {
      key: '1hg3g4Dkwr6pSt22n00EfS01rz568IR6',
      expired: true
    },
    {
      key: '8vtk7KykflO5IzB96kb0mpot0sU40096',
      expired: true
    },
    {
      key: '18f3cT02U9f6yRl3OKDpP8NA537kxYKu',
      expired: false
    }
  ];

  var origin = 'http://api.bigoven.com/';

  var dishCache = {};

  this.invalidateKey = function(key) {
    console.log("expiring key: " + key)
    for (var i = 0; i < apiKeys.length; i++) {
      var cur = apiKeys[i];
      if (cur.key == key) {
        console.log("EXPIRED KEY: "+ cur.key)
        cur.expired = true;
      }
    }
  }

  this.wrapCb = function(cb, self) {
    return function() {
      var parsed = JSON.parse(this.responseText);
      if (parsed.Message) {
        if (parsed.Message.includes("limit exceeded")) {
          self.invalidateKey(self.getKey()); // should be the last key used..
          // could get into weird race conditions here but yolo
        }
      }
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
        'rpp': 12,
        'any_kw': keyword
      }),
      cb)
  }

  this.getKey = function() {
    console.log(apiKeys);
    for (var i = 0; i < apiKeys.length; i++) {
      if (!apiKeys[i].expired) {
        console.log("using key: " + apiKeys[i].key)
        return apiKeys[i].key;
      }
    }
    console.log("Returning undefined ");
  }

  this.composeParams = function(params) {
    return '?' + Object.keys(params).map(function(paramKey) { return paramKey + "=" + params[paramKey] }).join('&')
  }

  this.queryBigOven = function(url , cb) {
    console.log("Sending request " + url);
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.setRequestHeader('Accept', 'application/json');
    req.addEventListener('load', this.wrapCb(cb, this));
    req.send();
  }



}