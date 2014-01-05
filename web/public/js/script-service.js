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
    var script = $location.search().s;
    var input = $location.search().i;

    var stored = angular.fromJson(localStorage.scriptService);
  
    if (script) {
      service.script = base64.decode(script).toString();
    } else if (stored) {
      service.script = stored.script;
    }

    if (input) {
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
