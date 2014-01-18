var app = require('./app');
var base64 = require('urlsafe-base64');

app.controller('ExamplesCtrl', function($scope, $http) {
  $scope.examples = [];

  $http.get('https://api.github.com/gists/8480925')
    .success(function(data) {
      $scope.examples = $.parseJSON(data.files['TRUE.json'].content);
    })
    .error(function(data, status) {
    });

  $scope.exampleLink = function(example) {
    var input = example.input;
    var script = example.script;
    var encodedInput = base64.encode(new Buffer(input || ''));
    var encodedScript = base64.encode(new Buffer(script || ''));

    return window.location.origin
         + "/?s=" + encodedScript
         + "&i=" + encodedInput;
  };
});
