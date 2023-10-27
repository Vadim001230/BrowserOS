function splitStrBySeparotor(str, separator) {
  if (separator === '') {
    return [str, ''];
  }
  const [first, ...rest] = str.split(separator);
  return [first, rest.join(separator)];
}