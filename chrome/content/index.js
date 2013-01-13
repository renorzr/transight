Components.utils.import('resource://lib/transight.js');

var transight = {
    init: function() {
      gBrowser.addEventListener('DOMContentLoaded', function() {
        new TranSight(window);
      });
    },

    run: function() {

        var doc = window.top.getBrowser().selectedBrowser.contentWindow.document;
        alert('run '+doc.title);

    },

    showAbout: function() {

        alert("TranSight, created by Reno Ren");

    },

    goHome: function() {

        var win = window.top.getBrowser().selectedBrowser.contentWindow;
        win.open("http://transight.zhirui.org");

    }

}

window.addEventListener("load", transight.init, false);
