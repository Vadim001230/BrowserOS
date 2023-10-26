function parseIp(ip) {
  const result = [];
  const numbers = ip.split('.');
  if (numbers.length != 4) {
    return;
  }

  for (num of numbers) {
    if (isNaN(+num)) {
      return;
    }
    result.push(+num);
  }

  return result;
}
