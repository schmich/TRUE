var base64 = require('urlsafe-base64');
var aceRange = ace.require('ace/range').Range;
var parser = require('./parser').parser;
var $t = require('./true');

window.ScriptCtrl = function($scope, scriptService) {
  $scope.scriptService = scriptService;

  $scope.output = '';
  $scope.error = null;
  $scope.stack = [];
  $scope.vars = {};

  $scope.debugging = false;
  $scope.exception = false;
  $scope.halted = false;
  $scope.command = null;

  $scope.encodedScript = '';
  $scope.encodedInput = '';

  var editor = ace.edit('edit-script');
  editor.setOption('highlightActiveLine', false);

  if (scriptService.script != null) {
    editor.getSession().getDocument().setValue(scriptService.script);
  }

  $scope.$watch('scriptService.input', function(input) {
    if (input != null)
      $scope.encodedInput = base64.encode(new Buffer(input));
  });

  $scope.$watch('scriptService.script', function(script) {
    if (script != null)
      $scope.encodedScript = base64.encode(new Buffer(script));
  });

  editor.getSession().getDocument().on('change', function(e) {
    $scope.$apply(function() {
      scriptService.script = editor.getSession().getDocument().getValue();
    });
  });

  $(window).on('keydown', function(e) {
    if (e.keyCode == 27 /* Escape */) {
      $scope.$apply(function() {
        stopScript();
      });
    }
  });

  $(window).on('keypress', function(e) {
    if ((e.keyCode == 18 || e.keyCode == 13) && e.ctrlKey /* Ctrl+R, Ctrl+Enter */) {
      $scope.$apply(function() {
        $scope.runScript();
      });
    }
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
    }
  });

  function compileScript() {
    var script = editor.getSession().getDocument().getValue();

    var env = new $t.Env();
    env.put = function(s) {
      $scope.output += s;
    };

    var input = $('#input').val();
    var pos = 0;
    env.get = function() {
      if (pos < input.length) {
        return input.charCodeAt(pos++);
      } else {
        return -1;
      }
    }

    $scope.output = '';
    $scope.error = null;

    var program = null;
    var valid = tryRun(function() {
      program = parser.parse(script);
    });

    return [valid, program, env];
  }

  function tryRun(runner) {
    var error = false;

    try {
      runner();
    } catch(e) {
      error = true;
      $scope.error = e.message;
    }

    return !error;
  }

  $scope.runScript = function() {
    var data = compileScript();
    var valid = data[0];
    var program = data[1];
    var env = data[2];

    if (!valid)
      return;

    var success = tryRun(function() {
      program.exec(env);
    });

    if (!success) {
      $scope.exception = true;
    } else {
      $scope.halted = true;
    }

    $scope.stack = env.stack;
    $scope.vars = env.vars;

    setTimeout(function() {
      $scope.$apply(function() {
        $scope.halted = false;
        $scope.exception = false;
      });
    }, 2000);
  };

  $scope.resumeScript = function() {
    var run = function() {
      do {
        var cmd = $scope.stepper.step();
        if (cmd)
          $scope.command = cmd;
      } while (cmd);
    };

    if (!tryRun(run)) {
      $scope.command = $scope.stepper.next();
      $scope.exception = true;
      return;
    }

    $scope.halted = true;
  }

  $scope.stepScript = function() {
    if ($scope.exception)
      return;

    var run = function() {
      $scope.command = $scope.stepper.step();
    };

    if (!tryRun(run)) {
      $scope.exception = true;
      return;
    }

    var next = $scope.stepper.next();
    if (!next)
      $scope.halted = true;
    else
      $scope.command = next;
  };

  $scope.debugScript = function() {
    var data = compileScript();
    var valid = data[0];
    var program = data[1];
    var env = data[2];

    if (!valid)
      return;

    $scope.halted = false;
    $scope.exception = false;
    $scope.debugging = true;
    $scope.stack = env.stack;
    $scope.vars = env.vars;
    $scope.stepper = program.stepper(env);
    $scope.command = $scope.stepper.next();
    setTimeout(function() { $('#step').focus(); });
  };

  function stopScript() {
    $scope.exception = false;
    $scope.debugging = false;
    $scope.halted = false;
    $scope.stepper = null;
    $scope.command = null;
    setTimeout(function() { editor.focus(); });
  }

  $scope.stopScript = function() {
    stopScript();
  };

  $scope.hideError = function(elem) {
    $scope.error = null;
  };

  setTimeout(function() {
    editor.navigateFileEnd();
    editor.focus();
  });
}
