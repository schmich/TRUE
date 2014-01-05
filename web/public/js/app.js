$app = angular.module('TRUE', []);

$app.run(function($rootScope) {
  window.onbeforeunload = function() {
    $rootScope.$broadcast('saveState');
  };
});
