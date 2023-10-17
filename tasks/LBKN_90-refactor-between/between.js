function getValueBetween(str, start, end) {
  const startIndex = str.indexOf(start);
  const endIndex = end ? str.indexOf(end) : str.length;
  if (startIndex === -1 || endIndex === -1) {
    return '';
  }
  return str.substring(startIndex + start.length, endIndex);
}
