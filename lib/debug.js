EXPORTED_SYMBOLS = ['log'];

var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
function log() {
  var str = '';
  for (var i = 0; i < arguments.length; i++) str += arguments[i] + ' ';
  consoleService.logStringMessage(str);
}


