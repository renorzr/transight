Components.utils.import('resource://lib/translate.js');
Components.utils.import('resource://lib/appearance.js');

EXPORTED_SYMBOLS = ["TranSight"];

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
}

function isEmpty(text) {
  return text == null || text.replace(/\n|\r|\s/g, '') === '';
}

function TranSight(window) {
  var self = this;
  var document = window.content.document;

  document.addEventListener("mouseup", function(e){self.onSelect(e)})

  this.onSelect = function(e) {
    if (self.delayed) {
      window.clearTimeout(self.delayed);
      self.delayed = null;
    }

    var text = document.getSelection().toString().trim();
    if (isEmpty(text)) return;

    self.delayed = window.setTimeout((function(text){
      return function () {
        display(window, text);
        translate(text, function(err, result){
          display(window, text, result);
        });
      }
    })(text), 200);
  };
}
