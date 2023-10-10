const square = function(x) {
  return x ** 2;
}

function expViaCallback(num, fn) {
  return fn(fn(num, square), square);
}

module.exports = expViaCallback;
