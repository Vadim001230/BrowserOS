function getValueBetween(str, prefix, suffix) {
  const prefixIndex = str.indexOf(prefix);
  if (prefixIndex === -1) return '';
  str = str.substring(prefixIndex + prefix.length);
  const suffixIndex = suffix ? str.indexOf(suffix) : str.length;
  return suffixIndex === -1 ? '' : str.substring(0, suffixIndex);
}