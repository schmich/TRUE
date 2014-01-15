var app = require('./app');
var base64 = require('urlsafe-base64');
var examples = require('./examples');

app.controller('ExamplesCtrl', function($scope, $http) {
  $scope.examples = examples;
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
