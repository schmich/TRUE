var fs = require('fs');

var parser = require('./parser.js');
var t = require('./true.js');

fs.readFile('test.t', 'utf8', function(err, data) {
  var program = parser.parse(data);
  var stack = [];
  program.exec(new t.Env(stack));
  console.log(stack);
});
