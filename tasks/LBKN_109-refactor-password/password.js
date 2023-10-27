const getRandomNumberFromRange = require('../../utils/number');

function generatePassword(alphabet, passLength) {
  let password = '';
  for (let i = 0; i < passLength; i++) {
    const randomIndex = getRandomNumberFromRange(0, alphabet.length - 1);
    password += alphabet[randomIndex];
  }
  return password;
}
