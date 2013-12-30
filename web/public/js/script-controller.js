function ScriptCtrl($scope) {
  $scope.script = '';
  $scope.output = '';
  $scope.error = null;
  $scope.stack = [];
  $scope.vars = {};

  $scope.exception = false;
  $scope.debugging = false;
  $scope.halted = false;
  $scope.stepper = null;
  $scope.command = null;

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

  function compileScript() {
    var script = $('#script').val();
    $scope.script = script;

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
      program = $parser.parse(script);
    });

    return [valid, program, env];
  }

  function tryRun(runner) {
    var error = false;

    try {
      runner();
    } catch(e) {
      error = true;
      if (e instanceof $parser.SyntaxError) {
        $scope.error = e.message + ' At line ' + e.line + ', column ' + e.column + '.';
      } else {
        $scope.error = e.message;
      }
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
    $scope.script = '';
    $scope.exception = false;
    $scope.debugging = false;
    $scope.halted = false;
    $scope.stepper = null;
    $scope.command = null;
    setTimeout(function() { $('#script').focus(); });
  }

  $scope.stopScript = function() {
    stopScript();
  };

  $('#script').focus();
}
