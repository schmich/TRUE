var assert = require('assert');
var parser = require('./parser.js');
var t = require('./true.js');

function run(script) {
  var env = new $t.Env();
  var results = {
    s: env.stack,
    out: ''
  };
  env.put = function(s) {
    results.out += s;
  };
  var program = $parser.parse(script);
  program.exec(env);
  return results;
}

function arrEq(expected, actual) {
  assert.equal(expected.length, actual.length);
  for (var i = 0; i < expected.length; ++i)
    assert.equal(expected[i], actual[i]);
}

var se = $parser.SyntaxError;
var re = $t.RuntimeError;

var tests = [
  ['', []],
  ['42', [42]],
  ['4{c}', [4]],
  ['{c}4', [4]],
  ['{c}4{c}', [4]],
  //['{c}', []],
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
  // getChar
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
  ["20 9[1-$][\\$@$@$@$@\\/*=[1-$$[%\\1-$@]?0=[\\$.' ,\\]?]?]#%%", [], '19 17 13 11 7 5 3 2 '],
  ['[$1=$[\\%1\\]?~[$1-f;!*]?]f:6f;!.', [], '720'],
  ["[\"'[,34,$!34,'],!\"]'[,34,$!34,'],!", [], "[\"'[,34,$!34,'],!\"]'[,34,$!34,'],!"]
];

describe('TRUE', function() {
  for (var i = 0; i < tests.length; ++i) {
    var test = tests[i];

    (function(test) {
      var script = test[0];
      it('script: ' + script, function() {
        var expectedResult = test[1];
        if (expectedResult instanceof Array) {
          var expectedOutput = test[2];

          var r = run(script);
          arrEq(expectedResult, r.s);

          if (expectedOutput !== undefined) {
            assert.equal(expectedOutput, r.out);
          }
        } else {
          assert.throws(function() {
            var r = run(script);
          }, expectedResult);
        }
      });
    })(test);
  }
});
