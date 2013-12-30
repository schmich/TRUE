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
