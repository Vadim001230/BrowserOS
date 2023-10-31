function splitStrBySeparotor(str, separator) {
  const indexOfSeparator = str.indexOf(separator);
  if (indexOfSeparator === -1 || separator === '') {
    return [str, ''];
  }

  return [
    str.slice(0, indexOfSeparator),
    str.slice(indexOfSeparator + separator.length),
  ];
}
