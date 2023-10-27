function replace(str, substr, replacement) {
  if (substr === '') {
    return str;
  }
  return str.replaceAll(substr, replacement);
}
