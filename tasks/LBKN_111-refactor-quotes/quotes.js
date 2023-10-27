function changeDoubleQuotes(str) {
  const targetQuotes = {
    open: '«',
    close: '»',
  };
  let isOpen = true;
  let result = '';

  for (let char of str) {
    if (char === '"') {
      result += isOpen ? targetQuotes.open : targetQuotes.close;
      isOpen = !isOpen;
    } else {
      result += char;
    }
  }

  return result;
}
