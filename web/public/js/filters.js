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

$app.filter('empty', function() {
  return function(input) {
    return $.isEmptyObject(input);
  };
});

$app.filter('highlight', function($sce) {
  return function(src, command) {
    if (!command)
      return $sce.trustAsHtml(html);

    var start = command.source.start;
    var end = command.source.end;

    // TODO: Escape HTML.
    var html = src.substr(0, start) 
             + '<span class="active-command">'
             + src.substr(start, end - start)
             + '</span>'
             + src.substr(end);

    return $sce.trustAsHtml(html);
  };
});
