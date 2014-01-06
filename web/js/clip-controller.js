var base64 = require('urlsafe-base64');

window.ClipCtrl = function($scope, scriptService) {
  $scope.permalink = null;

  ZeroClipboard.setDefaults({ moviePath: '/ZeroClipboard.swf' });
  var clip = new ZeroClipboard($('#copy-button'));
  clip.on('dataRequested', function(client, args) {
    clip.setText($scope.permalink);
  });

  $scope.$watch('[scriptService.input, scriptService.script]', function(values) {
    var input = values[0];
    var script = values[1];

    var encodedInput = base64.encode(new Buffer(input));
    var encodedScript = base64.encode(new Buffer(script));

    $scope.permalink =
      window.location.origin +
      window.location.pathname +
      "?s=" + encodedScript +
      "&i=" + encodedInput;
  }, true);
}
