var express = require('express');
var http = require('http');
var path = require('path');
var browserify = require('browserify');
var jisonify = require('jisonify');
var Stream = require('stream');
var fs = require('fs');
var concat = require('concat-stream');
var crypto = require('crypto');

var app = express();

// All environments.
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

function isDevelopment() {
  return app.get('env') == 'development';
}

// Development only.
if (isDevelopment()) {
  app.use(express.errorHandler());
}

function generateBundle(hashes, callback) {
  var builder = browserify({ basedir: './js/', extensions: ['.jison'] });
  builder.transform(jisonify);

  fs.readdir('./js', function(err, files) {
    for (var i = 0; i < files.length; ++i) {
      var path = './js/' + files[i];
      var stat = fs.statSync(path);
      if (path.match(/\.(js|jison)$/) && !path.match(/test/) && !stat.isDirectory()) {
        hashes[files[i]] = crypto.createHash('md5').update(fs.readFileSync(path)).digest('hex');
        builder.add('./' + files[i]);
      }
    }

    var write = concat(callback);

    bundle = builder.bundle();
    bundle.pipe(write);
  });
}

var bundleCache = null;
var bundleHashes = {};
app.get('/js/bundle.js', function(req, res) {
  res.header('Content-Type', 'application/javascript');

  if (!bundleCache) {
    generateBundle(bundleHashes, function(data) {
      bundleCache = data;
      res.send(data);
    });
  } else {
    if (!isDevelopment()) {
      res.send(bundleCache);
    } else {
      fs.readdir('./js', function(err, files) {
        var changed = false;
        for (var i = 0; i < files.length; ++i) {
          var path = './js/' + files[i];
          var stat = fs.statSync(path);
          if (path.match(/\.(js|jison)$/) && !path.match(/test/) && !stat.isDirectory()) {
            var oldHash = bundleHashes[files[i]];
            var hash = crypto.createHash('md5').update(fs.readFileSync(path)).digest('hex');
            if (hash != oldHash) {
              bundleHashes[files[i]] = hash;
              changed = true;
            }
          }
        }

        if (changed) {
          generateBundle(bundleHashes, function(data) {
            bundleCache = data;
            res.send(data);
          });
        } else {
          res.send(bundleCache);
        }
      });
    }
  }
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/examples', function(req, res) {
  res.render('examples');
});

app.get('/reference', function(req, res) {
  res.render('reference');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
