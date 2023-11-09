function isValidateFullname(fullname) {
  let isValidName = fullname.length > 0 && typeof fullname === 'string' && fullname.includes(' ');

  if (!isValidName) {
    return false;
  }

  const loverFullname = fullname.toLowerCase();
  for (const char of loverFullname) {
    if (!((char >= 'a' && char <= 'z') || char === ' ')) {
      isValidName = false;
      break;
    }
  }

  return isValidName;
}
