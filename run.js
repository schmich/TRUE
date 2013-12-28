var fs = require('fs');

var parser = require('./parser.js');
var t = require('./true.js');

fs.readFile('test.t', 'utf8', function(err, data) {
  var program = parser.parse(data);
  var env = new t.Env([], {});
  program.exec(env);
  console.log();
  console.log(env.stack);
  console.log(env.vars);
});
