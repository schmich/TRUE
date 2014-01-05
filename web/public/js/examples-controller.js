window.ExamplesCtrl = function($scope, $http) {
  $scope.examples = null;

  $http.get('/examples')
    .success(function(data) {
      $scope.examples = data;
    })
    .error(function(data, status) {
    });

  $scope.load = function(example) {
    $('#edit-script').val(example.script);
    $('#input').val(example.input);
    setTimeout(function() { $('#run').focus(); });
  };
}
