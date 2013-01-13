EXPORTED_SYMBOLS = ['YoudaoAdapter'];

function YoudaoAdapter(apikey) {
  var apikey = apikey.split('|');
  this.url = function (from, to, text) {
    return "http://fanyi.youdao.com/openapi.do?keyfrom=" + apikey[0] + "&key=" + apikey[1] + "&type=data&doctype=json&version=1.1&q=" + text;
  };

  this.parse = function (body) {
    return JSON.parse(body).translation;
  };
}
