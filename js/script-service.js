var app = require('./app');
var base64 = require('urlsafe-base64');

app.factory('scriptService', function($rootScope, $location) {
  var service = {
    script: null,
    input: null
  };

  var saveState = function() {
    localStorage.scriptService = angular.toJson(service);
  };

  var restoreState = function() {
    var script = null;
    var input = null;
    var query = window.location.search;
    if (query.length > 1) {
      var parts = query.substring(1).split('&');
      var vars = {};
      for (var i = 0; i < parts.length; ++i) {
        var eq = parts[i].split('=');
        vars[eq[0]] = eq[1];
      }

      script = vars.s;
      input = vars.i;
    }

    var stored = angular.fromJson(localStorage.scriptService);
  
    if (script == '') {
      service.script = '';
    } else if (script != null) {
      service.script = base64.decode(script).toString();
    } else if (stored) {
      service.script = stored.script;
    }

    if (input == '') {
      service.input = '';
    } else if (input != null) {
      service.input = base64.decode(input).toString();
    } else if (stored) {
      service.input = stored.input;
    }
  };

  $rootScope.$on('saveState', saveState);
  $rootScope.$on('restoreState', restoreState);
  restoreState();

  return service;
});
