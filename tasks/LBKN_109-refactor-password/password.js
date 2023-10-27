function generatePassword(alphabet, passLength) {
  let password = '';
  for (let i = 0; i < passLength; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    password += alphabet[randomIndex];
  }
  return password;
}
