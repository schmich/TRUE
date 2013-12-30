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
  return function(src, item) {
    var next = item.next().source;

    // TODO: Escape HTML.
    var html = src.substr(0, next.column - 1) 
             + '<span class="next-command">'
             + next.text
             + '</span>'
             + src.substr(next.column + next.text.length - 1);

    return $sce.trustAsHtml(html);
  };
});
