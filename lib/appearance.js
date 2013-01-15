Components.utils.import('resource://lib/debug.js');
EXPORTED_SYMBOLS = ["display"];

var ELEM_ID = 'transight-translation-window';

function display(document, text, result) {
  var window = document.defaultView;
  var html = '<div>' + text + '</div>';

  if (result) {
    html += '<ul><li>'
      + result.join('</li><li>')
      + '</li></ul>';
  } else {
    html += '<div>loading...</div>';
  }
  html += '<div>' + '' + '</div>';

  var e = document.getElementById(ELEM_ID);
  if (!e) {
    e = document.createElement('div');
    e.id = ELEM_ID;
  }
  e.innerHTML = html;
  e.style.position   = 'fixed';
  e.style.color      = 'white';
  e.style.background = 'darkblue';
  e.style.bottom     = 0;
  e.style.left       = 0;
  e.style.padding    = '5px';
  e.style.zIndex     = 10;
  document.body.appendChild(e);
  e = document.getElementById(ELEM_ID);

  if (this.delay) {
    window.clearTimeout(this.delay);
    this.delay = null;
  }

  this.delay = window.setTimeout((function(e){
    return function() {
      document.body.removeChild(e);
    }
  })(e), 5000)
}
