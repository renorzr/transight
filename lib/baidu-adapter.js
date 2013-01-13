EXPORTED_SYMBOLS = ['BaiduAdapter'];

function BaiduAdapter(apikey) {
  this.url = function (from, to, text) {
    return "http://openapi.baidu.com/public/2.0/bmt/translate?client_id=" + apikey + "&q=" + text + "&from=" + from + "&to=" + to;
  };

  this.parse = function (body) {
    var results = [];
    var trans_result = JSON.parse(body).trans_result;
    for (var i in trans_result) {
      results.push(trans_result[i].dst);
    }
    
    return results;
  };
}
