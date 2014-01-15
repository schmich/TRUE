require('angular/lib/angular.min');
$ = require('jquery/dist/jquery.min')(window);

var app = angular.module('TRUE', [], function($locationProvider) {
});

app.run(function($rootScope) {
  window.onbeforeunload = function() {
    $rootScope.$broadcast('saveState');
  };
});

module.exports = app;
