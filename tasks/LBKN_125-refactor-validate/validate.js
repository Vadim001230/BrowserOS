function isValidate1(fullname) {
  if (fullname.length === 0 || typeof fullname !== 'string' || !fullname.includes(' ')) {
    return false;
  }

  const loverFullname = fullname.toLowerCase();
  for (const char of loverFullname) {
    if (char === ' ') continue;
    if (!(char >= 'a' && char <= 'z')) {
      return false;
    }
  }

  return true;
}
