const getWordsFromString = (str, separator = ' ') => str.trim().split(separator);

const getWordsCountInString = (str) => str.trim().length ? getWordsFromString(str).length : 0;
