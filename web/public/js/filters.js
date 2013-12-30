$app.filter('toString', function() {
  return function(input) {
    return input.toString();
  };
})

$app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

$app.filter('highlight', function($sce) {
  return function(src, command) {
    if (!command)
      return src;

    var next = command.source;

    // This is really inefficient. We could cache this info somewhere.
    var lines = src.split("\n");
    var index = 0;
    for (var i = 0; i < next.line - 1; ++i) {
      index += lines[i].length + 1;
    }

    index += next.column;

    // TODO: Escape HTML.
    var html = src.substr(0, index - 1) 
             + '<span class="next-command">'
             + next.text
             + '</span>'
             + src.substr(index + next.text.length - 1);

    return $sce.trustAsHtml(html);
  };
});
