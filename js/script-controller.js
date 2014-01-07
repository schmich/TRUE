var parser = require('./parser').parser;
var $t = parser.yy = require('./true');

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

  if (scriptService.script == null) {
    scriptService.script = '"Hello, "[^$~][,]#"!"';
  }

  if (scriptService.input == null) {
    scriptService.input = 'world';
  }

  $(window).on('keydown', function(e) {
    if (e.keyCode == 27 /* Escape */) {
      $scope.$apply(function() {
        $scope.stopDebugging();
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

  function compileScript() {
    var script = scriptService.script;

    var env = new $t.Env();
    env.put = function(s) {
      $scope.output += s;
    };

    var input = scriptService.input;
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
    var exception = tryRun(function() {
      program = parser.parse(script);
    });

    return [(exception == null), program, env];
  }

  function tryRun(runner) {
    var exception = null;

    try {
      runner();
    } catch(e) {
      exception = e;
      $scope.error = e.message;
    }

    return exception;
  }

  $scope.runScript = function() {
    var data = compileScript();
    var valid = data[0];
    var program = data[1];
    var env = data[2];

    if (!valid)
      return;

    var exception = tryRun(function() {
      program.exec(env);
    });

    if (exception) {
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
    var isBreak = false;

    var run = function() {
      do {
        try {
          var cmd = $scope.stepper.step();
          if (cmd)
            $scope.command = cmd;
        } catch (e) {
          if (e instanceof $t.BreakError) {
            $scope.command = e.command;
            isBreak = true;
            return;
          } else {
            throw e;
          }
        }
      } while (cmd);
    };

    var exception = tryRun(run);
    if (exception) {
      $scope.command = exception.command;
      $scope.exception = true;
    } else if (!isBreak) {
      $scope.halted = true;
    }
  }

  $scope.stepScript = function() {
    if ($scope.exception)
      return;

    var run = function() {
      try {
        $scope.command = $scope.stepper.step();
      } catch (e) {
        if (!(e instanceof $t.BreakError)) {
          throw e;
        }
      }
    };

    var exception = tryRun(run);
    if (exception) {
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

  $scope.stopDebugging = function() {
    $scope.exception = false;
    $scope.debugging = false;
    $scope.halted = false;
    $scope.error = null;
    $scope.stepper = null;
    $scope.command = null;
  };

  $scope.hideError = function(elem) {
    $scope.error = null;
  };
}
