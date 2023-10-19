function getValueBetween(str, prefix, suffix) {
  const prefixIndex = str.indexOf(prefix);
  if (prefixIndex === -1) {
    return '';
  }
  str = str.substring(prefixIndex + prefix.length);

  if (suffix) {
    const suffixIndex = str.indexOf(suffix);
    if (suffixIndex === -1) {
      return '';
    }
    str = str.substring(0, suffixIndex);
  }

  return str;
}
