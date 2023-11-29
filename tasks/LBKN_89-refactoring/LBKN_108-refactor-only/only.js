function copyListedValues(obj, ...values) {
  const result = {};
  values.forEach((value) => {
    if (value in obj) {
      result[value] = obj[value];
    }
  });

  return result;
}
