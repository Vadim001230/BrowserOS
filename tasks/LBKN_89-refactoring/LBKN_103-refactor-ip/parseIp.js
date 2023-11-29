function parseIp(ip) {
  const partsOfIp = ip.split('.');
  if (partsOfIp.length !== 4) {
    return;
  }

  for (let i = 0; i < partsOfIp.length; i++) {
    partsOfIp[i] = +partsOfIp[i];
    if (isNaN(partsOfIp[i])) {
      return;
    }
  }

  return partsOfIp;
}

