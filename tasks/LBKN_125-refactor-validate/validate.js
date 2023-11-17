function isValidate(fullname) {
  const isValidName = fullname.length && typeof fullname === 'string' && fullname.includes(' ');

  if (!isValidName) {
    return false;
  }

  const isValidCharacter = (char) => (char >= 'a' && char <= 'z') || char === ' ';

  for (const char of fullname.toLowerCase()) {
    if (!isValidCharacter(char)) {
      return false;
    }
  }

  return isValidName;
}
