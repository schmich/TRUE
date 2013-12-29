function ScriptCtrl($scope) {
  $scope.output = '';
  $scope.error = null;
  $scope.stack = [];
  $scope.vars = {};

  $(window).on('keypress', function(e) {
    if (e.keyCode == 18 && e.ctrlKey /* Ctrl+R */) {
      $scope.$apply(function() {
        $scope.runScript();
      });
    }
  });

  $scope.runScript = function() {
    var script = $('#script').val();

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

    try {
      var program = $parser.parse(script);
      program.exec(env);
    } catch(e) {
      $scope.error = e.message;
    }

    $scope.stack = env.stack;
    $scope.vars = env.vars;
  };
}

// Examples:
// even/odd:  `$2/2*=$["even"]?~["odd"]?
// factorial: [$1=$[\%1\]?~[$1-f;!*]?]f:`f;!.
// strrev:    0[^$~][]#%[$][,]#
// strlen:    0[^~][1+]#.
// prime:     99 9[1-$][\$@$@$@$@\/*=[1-$$[%\1-$@]?0=[\$.' ,\]?]?]#
// alphabet:  27 [1-$][$123\-,]#
// greet:     "Hello, "[^$~][,]#%"!"
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
