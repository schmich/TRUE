require('angular/lib/angular.min');

var app = angular.module('TRUE', [], function($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.run(function($rootScope) {
  window.onbeforeunload = function() {
    $rootScope.$broadcast('saveState');
  };
});

module.exports = app;
