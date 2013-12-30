function ScriptCtrl($scope) {
  $scope.script = '';
  $scope.output = '';
  $scope.error = null;
  $scope.stack = [];
  $scope.vars = {};

  $scope.running = false;
  $scope.stepper = null;

  $(window).on('keydown', function(e) {
    $scope.$apply(function() {
      if (e.keyCode == 27 /* Escape */)
        stopScript();
    });
  });

  $(window).on('keypress', function(e) {
    if (e.keyCode == 18 && e.ctrlKey /* Ctrl+R */) {
      $scope.$apply(function() {
        $scope.runScript();
      });
    }
  });

  function initializeRun() {
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
    safeRun(function() {
      program = $parser.parse(script);
    });

    return [program, env];
  }

  function safeRun(runner) {
    try {
      runner();
    } catch(e) {
      if (e instanceof $parser.SyntaxError) {
        $scope.error = e.message + ' At line ' + e.line + ', column ' + e.column + '.';
      } else {
        $scope.error = e.message;
      }
    }
  }

  $scope.runScript = function() {
    var data = initializeRun();
    var program = data[0];
    var env = data[1];

    safeRun(function() {
      program.exec(env);
    });

    $scope.stack = env.stack;
    $scope.vars = env.vars;
  };

  $scope.stepScript = function() {
    function makeStep() {
      var cmd = $scope.stepper.step();

      if (!$scope.stepper.next())
        $scope.running = false;
    }

    if ($scope.running) {
      makeStep();
    } else {
      $scope.running = true;

      var data = initializeRun();
      var program = data[0];
      var env = data[1]; 

      $scope.stack = env.stack;
      $scope.vars = env.vars;
      $scope.stepper = program.stepper(env);
    }
  };

  function stopScript() {
    $scope.running = null;
    $scope.stepper = null;
    setTimeout(function() { $('#script').focus(); });
  }

  $scope.stopScript = function() {
    stopScript();
  };
}

// Examples:
// even/odd:  [$2/2*=]even:[even;!~]odd:6odd;!
// even/odd (mutual recursion):
//   [$0=$[1_\@%]?~[1-odd;!]?]even:[$0=~$[1_\@%]?~[1-even;!~]?]odd:6even;!
// factorial: [$1=$[\%1\]?~[$1-f;!*]?]f:`f;!.
// strrev:    0[^$~][]#%[$][,]#
// strlen:    0[^~][1+]#.
// prime:     99 9[1-$][\$@$@$@$@\/*=[1-$$[%\1-$@]?0=[\$.' ,\]?]?]#
// alphabet:  27 [1-$][$123\-,]#
// greet:     "Hello, "[^$~][,]#%"!"
// quine:     ["'[,34,$!34,'],!"]'[,34,$!34,'],!
// add:       [[$][1-\1+\]#%]add:5 7add;!
// [0[^$~][]#%]readAll:
// [$$47>\58\>&]isDigit:
// [0[^isDigit;!][\10*\48-+]#%]readInt:

// draw box (size n):
// [1+$[1-$]['*,]#%%]db: { define top/bottom border func }
// ` { read size }
// $$1=$["*"%%]?~[ { handle corner case of size 1 }
//  db;! { draw top border }
//  $$1-[1-$] { for each open row }
//   [\10,'*,$1-[1-$][' ,]#%\'*,] { print open row }
//  #%%10, {end for each, trailing newline }
//  db;! { draw bottom border }
// ]?
