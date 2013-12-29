var express = require('express');
var http = require('http');
var path = require('path');
var base64 = require('urlsafe-base64');

var app = express();

// All environments.
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// Development only.
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  var script = null;
  if (req.query.s)
    script = base64.decode(req.query.s);

  var input = null;
  if (req.query.i)
    input = base64.decode(req.query.i);

  res.render('index', { script: script, input: input });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
