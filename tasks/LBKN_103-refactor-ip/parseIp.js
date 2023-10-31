function parseIp(ip) {
  const numbersOfIp = ip.split('.');
  if (numbersOfIp.length != 4) {
    return;
  }

  for (let i = 0; i < numbersOfIp.length; i++) {
    numbersOfIp[i] = +numbersOfIp[i];
    if (isNaN(numbersOfIp[i])) {
      return;
    }
  }

  return numbersOfIp;
}
