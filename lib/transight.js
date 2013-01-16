Components.utils.import('resource://lib/translate.js');
Components.utils.import('resource://lib/dialog.js');
Components.utils.import('resource://lib/debug.js');

EXPORTED_SYMBOLS = ["TranSight"];

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
}

var SEC = 1000;
var DUR_PER_CHAR = 0.2 * SEC;
var MIN_DURATION = 5 * SEC;
var MAX_DURATION = 30 * SEC;

function isEmpty(text) {
  log('isEmpty', text);
  return text == null || text.replace(/\n|\r|\s/g, '') === '';
}

function TranSight(window) {
  var self = this;
  var document = window.content.document;

  document.addEventListener("mouseup", function(){self.onMouseUp()})

  this.onMouseUp = function() {
    var text = self.getSelectedText();
    if (text === self.text) return;
    self.text = text;
    self.onSelect(text);
  }

  this.onSelect = function(text) {
    if (self.delayed) {
      window.clearTimeout(self.delayed);
      self.delayed = null;
    }

    if (isEmpty(text)) return;

    self.delayed = window.setTimeout((function(dialog, text){
      return function () {
        dialog.show(appearance(text));
        translate(text, (function(dialog) {
          return function(err, result){
            if (err) {
              dialog.show(appearance(text, '(error)'), MIN_DURATION);
            } else {
              var duration = result.join().length * DUR_PER_CHAR;
              if (duration < MIN_DURATION) duration = MIN_DURATION
              else if (duration > MAX_DURATION) duration = MAX_DURATION;
              dialog.show(appearance(text, result), duration);
            }
            document.getElementById('options').onclick = function(){window.openDialog('chrome://transight/content/options.xul')};
          }
        })(dialog));
      }
    })(new Dialog(document), text), 200);
  };

  this.getSelectedText = function() {
    return document.getSelection().toString().trim();
  }
}

function appearance(text, result) {
  var html = '<div>' + text + '</div>';

  if (result) {
    html += '<ul><li>'
      + result.join('</li><li>')
      + '</li></ul>';
  } else {
    html += '<div>loading...</div>';
  }
  html += '<div><a id="options">Options</a></div>';

  return html
}
