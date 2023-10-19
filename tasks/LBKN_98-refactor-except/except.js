function getValuesExcept(obj, ...exceptions) {
  const result = { ...obj };
  exceptions.forEach((exception) => delete result[exception]);
  return result;
}
