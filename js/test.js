var fs = require('fs');
var contents = fs.readFileSync('./parser.jison', 'utf-8');
var jison = require('jison');
var parser = new jison.Parser(contents);
var $t = parser.yy = require('./true');
var assert = require('assert');

function run(script, input, runFunc) {
  var env = new $t.Env();
  var results = {
    stack: env.stack,
    out: ''
  };
  env.put = function(s) {
    results.out += s;
  };
  var pos = 0;
  env.get = function() {
    if (pos < input.length) {
      return input.charCodeAt(pos++);
    } else {
      return -1;
    }
  };
  var program = parser.parse(script);
  runFunc(program, env);
  return results;
}

function execRun(script, input) {
  return run(script, input, function(program, env) {
    program.exec(env);
  });
}

function stepRun(script, input) {
  return run(script, input, function(program, env) {
    var stepper = program.stepper(env);
    while (stepper.step()) { }
  });
}

function arrEq(expected, actual) {
  assert.equal(expected.length, actual.length);
  for (var i = 0; i < expected.length; ++i)
    assert.equal(expected[i], actual[i]);
}

var se = Error;
var re = $t.RuntimeError;

var tests = [
  ['', []],
  [' ', []],
  [' \n\t', []],
  ['42', [42]],
  ['4{c}', [4]],
  ['{c}4', [4]],
  ['{c}4{c}', [4]],
  ['{c}', []],
  ['{a\nb}', []],
  ['{a} {b}', []],
  ['1 2 3', [1, 2, 3]],
  ["'a", [97]],
  ['1 2+', [3]],
  ['1 2 3++', [6]],
  ['5 3-', [2]],
  ['3 5-', [-2]],
  ['2 3*', [6]],
  ['6 3/', [2]],
  ['9 4/', [2]],
  ['5_', [-5]],
  ['3__', [3]],
  ['4 4=', [-1]],
  ['4 2=', [0]],
  ['4 2>', [-1]],
  ['2 4>', [0]],
  ['1_1_&', [-1]],
  ['1_0&', [0]],
  ['0 1_&', [0]],
  ['0 0&', [0]],
  ['1_1_|', [-1]],
  ['1_0|', [-1]],
  ['0 1_|', [-1]],
  ['0 0|', [0]],
  ['0~', [-1]],
  ['1_~', [0]],
  ['0~~', [0]],
  ['2$', [2, 2]],
  ['4 2%', [4]],
  ['4 2\\', [2, 4]],
  ['1 2 3@', [2, 3, 1]],
  ['1 2 3 4@', [1, 3, 4, 2]],
  ['4 0ø', [4, 4]],
  ['4 2 1ø', [4, 2, 4]],
  ['1 2 3 4 3ø', [1, 2, 3, 4, 1]],
  ['10.', [], '10'],
  ["'a,", [], 'a'],
  ['97,', [], 'a'],
  ['4 "ok"', [4], 'ok'],
  ["3.'\n,3.", [], '3\n3'],
  ['"a\nb"', [], 'a\nb'],
  ['"abc""def"', [], 'abcdef'],
  [['^', 'a'], [97]],
  [['^^,,', 'ab'], [], 'ba'],
  [['^', ''], [-1]],
  // varAssign
  // varRead
  // pushSubroutine
  // random
  // assembly
  // More tests around ops that don't care about type (e.g. []$, []%, var assign, ...).
  ['[1 2]!', [1, 2]],
  ['1_[4]?', [4]],
  ['0[4]?', []],
  ['1_[][4 0]#', [4]],
  ['0[][4]#', []],
  ['ß', []],
  ['5~', [-6]],
  /* Formatting. */
  ['   4   ', [4]],
  ['   4   2   ', [4, 2]],
  /* Parse errors. */
  ['{c', se],
  ['c}', se],
  ['"q', se],
  ['q"', se],
  ['[2', se],
  ['2]', se],
  ['2(', se],
  ['2)', se],
  ['2()', se],
  /* Runtime errors */
  ['1 0/', re],
  /* Stack errors. */
  ['+', re],
  ['1+', re],
  ['-', re],
  ['1-', re],
  ['*', re],
  ['1*', re],
  ['/', re],
  ['1/', re],
  ['_', re],
  ['=', re],
  ['1=', re],
  ['>', re],
  ['1>', re],
  ['&', re],
  ['0&', re],
  ['|', re],
  ['0|', re],
  ['~', re],
  ['$', re],
  ['%', re],
  ['\\', re],
  ['0\\', re],
  ['@', re],
  ['1@', re],
  ['1 2@', re],
  ['ø', re],
  ['0ø', re],
  ['1 2 1_ø', re],
  ['1 1ø', re],
  ['.', re],
  [',', re],
  ['a;', re],
  ['!', re],
  ['?', re],
  ['[]?', re],
  ['[]#', re],
  ['∆', re],
  ['1∆', re],
  /* Type errors. */
  ['[]2+', re],
  ['2[]+', re],
  ['[]2-', re],
  ['2[]-', re],
  ['[]2*', re],
  ['2[]*', re],
  ['[]2/', re],
  ['2[]/', re],
  ['[]_', re],
  ['[]2=', re],
  ['2[]=', re],
  ['[]2>', re],
  ['2[]>', re],
  ['[]0&', re],
  ['0[]&', re],
  ['[]0|', re],
  ['0[]|', re],
  ['[]~', re],
  ['1 2 3[]ø', re],
  ['[].', re],
  ['[],', re],
  ['2!', re],
  ['[][]?', re],
  ['0 2?', re],
  ['[]2#', re],
  ['2[]#', re],
  ['[]2∆', re],
  ['2[]∆', re],
  /* Complex scenarios. */
  ['1[2[+]!]!', [3]],
  ['27 [1-$][$123\\-,]#%', [], 'abcdefghijklmnopqrstuvwxyz'],
  ["99 9[1-$][\\$@$@$@$@\\/*=[1-$$[%\\1-$@]?0=[\\$.' ,\\]?]?]#%%", [], '97 89 83 79 73 71 67 61 59 53 47 43 41 37 31 29 23 19 17 13 11 7 5 3 2 '],
  ['[$1=$[\\%1\\]?~[$1-f;!*]?]f:6f;!.', [], '720'],
  ["[\"'[,34,$!34,'],!\"]'[,34,$!34,'],!", [], "[\"'[,34,$!34,'],!\"]'[,34,$!34,'],!"],
  ['[[$][1-\\1+\\]#%]add:5 7add;!', [12]],
  [['0[^$~][]#%[$][,]#%', 'reverse'], [], 'esrever']
];

describe('TRUE', function() {
  var runTypes = [execRun, stepRun];
  for (var r = 0; r < runTypes.length; ++r) {
    var runner = runTypes[r];

    for (var i = 0; i < tests.length; ++i) {
      var test = tests[i];

      (function(test, runner) {
        var input = test[0];
        var script;
        if (input instanceof Array) {
          script = input[0];
          input = input[1];
        } else {
          script = input;
          input = '';
        }

        it('script: ' + script, function() {
          var expectedResult = test[1];
          if (expectedResult instanceof Array) {
            var expectedOutput = test[2];

            var r = runner(script, input);
            arrEq(expectedResult, r.stack);

            if (expectedOutput !== undefined) {
              assert.equal(expectedOutput, r.out);
            }
          } else {
            assert.throws(function() {
              var r = runner(script);
            }, expectedResult);
          }
        });
      })(test, runner);
    }
  }
});
