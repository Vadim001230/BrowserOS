function isValidate(fullname) {
  const isValidName = fullname.length && typeof fullname === 'string' && fullname.includes(' ');

  if (!isValidName) {
    return false;
  }

  const isValidCharacter = (char) => (char >= 'a' && char <= 'z') || char === ' ';

  const lovercaseFullname = fullname.toLowerCase();
  for (const char of lovercaseFullname) {
    if (!isValidCharacter(char)) {
      return false;
    }
  }

  return isValidName;
}
