function changeDoubleQuotes(str) {
  let isOpen = true;

  return str.replaceAll('"', () => {
    const quote = isOpen ? '«' : '»';
    isOpen = !isOpen;
    return quote;
  });
}
