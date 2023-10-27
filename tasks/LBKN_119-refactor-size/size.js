function convertBytes(bytes) {
  const sizes = ['byte', 'kb', 'mb', 'gb'];

  function convert(units, exp = 0) {
    if (units >= 1000) {
      return convert(units / 1000, ++exp);
    }
    return Math.round(units) + ' ' + sizes[exp];
  }

  return convert(bytes);
}
