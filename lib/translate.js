Components.utils.import('resource://lib/debug.js');
Components.utils.import('resource://lib/baidu-adapter.js');
Components.utils.import('resource://lib/youdao-adapter.js');

EXPORTED_SYMBOLS = ["translate"]

//var adapter = new BaiduAdapter('NQRV8vZBrGsLn9wHk0xFQlDr');
var adapter = new YoudaoAdapter('TranSight|1267803886');
var service = new Service(adapter);

function translate(text, callback) {
  service.translate('auto', 'auto', text);
  service.on('done', callback);
}

function Service(adapter) {
  var events = {};
  var self = this;
  
  this.detectLanguage = function (text) {
  }

  this.translate = function (from, to, text) {
    var url = adapter.url(from, to, text);

    var request = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]
                  .createInstance(Components.interfaces.nsIXMLHttpRequest);

    log('request', url);
    request.onload = function(event) {
      var results = adapter.parse(event.target.responseText);
      
      self.emit('done', null, results);
    };
    request.onerror = function(event) {
      log('error', event);
    };
    request.open("GET", url, true);
    request.send(null);
  }

  this.on = function (eventName, callback) {
    events[eventName] = callback;
  }

  this.emit = function (eventName, err, result) {
    log('emit', eventName, err, result)
    events[eventName](err, result);
  }
}
