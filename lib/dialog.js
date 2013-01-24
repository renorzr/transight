Components.utils.import('resource://lib/debug.js');
EXPORTED_SYMBOLS = ["Dialog"];

var ELEM_ID = 'transight-translation-dialog';
function Dialog(document, html) {
  var self = this;
  var window = document.defaultView;
  var e = document.getElementById(ELEM_ID);
  if (!e) {
    e = document.createElement('div');
    e.id = ELEM_ID;
  }
  e.innerHTML = html || '';
  e.style.position   = 'fixed';
  e.style.color      = 'white';
  e.style.background = 'darkblue';
  e.style.bottom     = 0;
  e.style.left       = 0;
  e.style.padding    = '5px';
  e.style.zIndex     = 10;
  e.style.display    = 'none';
  document.body.appendChild(e);

  e.onmouseover = (function(dialog){
    return function(){dialog.show();}
  })(self);
  e.onmouseout  = (function(dialog){
    return function(){if (dialog.visible) dialog.show(null, 5000);}
  })(self);
  e.onmousedown = (function(dialog){
    return function(){dialog.hide();}
  })(self);

  this.show = function(html, duration) {
    log('show', html, duration);
    self.visible = true;
    e.style.display = '';
    if (html) e.innerHTML = html;

    if (self.hiding) {
      window.clearTimeout(self.hiding);
      self.hiding = null;
    }

    if (duration) {
      self.hiding = window.setTimeout(
        (function(dialog){
          return function(){dialog.hide()}
        })(self),
        duration);
    }
  };

  this.hide = function() {
    log('hide');
    self.visible = false;
    e.style.display = 'none';
  };
}
