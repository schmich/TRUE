var ace = require('brace');
var aceRange = ace.acequire('ace/range').Range;

window.EditCtrl = function($scope, scriptService) {
  $scope.scriptService = scriptService;

  var editor = ace.edit('edit-script');
  editor.setOption('highlightActiveLine', false);

  if (scriptService.script != null) {
    editor.getSession().getDocument().setValue(scriptService.script);
  }

  editor.getSession().getDocument().on('change', function(e) {
    $scope.$apply(function() {
      scriptService.script = editor.getSession().getDocument().getValue();
    });
  });

  var debugMarkerId = null;
  $scope.$watch('command', function(command) {
    if (!command)
      return;

    var range = new aceRange(
      command.source.row.start,
      command.source.column.start,
      command.source.row.end,
      command.source.column.end + 1
    );

    if (debugMarkerId !== null)
      editor.getSession().removeMarker(debugMarkerId);

    debugMarkerId = editor.getSession().addMarker(range, 'active-command', 'text');
  });

  $scope.$watch('debugging', function(debugging) {
    editor.setReadOnly(debugging);

    if (!debugging) {
      editor.getSession().removeMarker(debugMarkerId);
      debugMarkerId = null;

      setTimeout(function() { editor.focus(); });
    }
  });

  setTimeout(function() {
    editor.navigateFileEnd();
    editor.focus();
  });
}
