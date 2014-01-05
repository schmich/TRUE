$app.factory('scriptService', function($rootScope) {
  var service = {
    script: null,
    input: null
  };

  var saveState = function() {
    localStorage.scriptService = angular.toJson(service);
  };

  var restoreState = function() {
    service = angular.fromJson(localStorage.scriptService);
  };

  $rootScope.$on('saveState', saveState);
  $rootScope.$on('restoreState', restoreState);
  restoreState();

  return service;
});
