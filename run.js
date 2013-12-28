var fs = require('fs');

var parser = require('./parser.js');
var t = require('./true.js');

fs.readFile('test.t', 'utf8', function(err, data) {
  var i = 0;
  var input = process.argv[2];

  var env = new t.Env();
  env.print = function(s) { process.stdout.write(s); };
  env.readChar = function() {
    if (i < input.length) {
      return input.charCodeAt(i++);
    } else {
      return -1;
    }
  };

  var program = parser.parse(data);
  program.exec(env);

  console.log();
  console.log('--- DEBUG ---');
  console.log(env.stack);
  console.log(env.vars);
});
