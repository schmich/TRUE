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
