function copyListedValues(obj, ...values) {
  const result = {};
  values.forEach((value) => {
    if (obj.hasOwnProperty(value)) {
      result[value] = obj[value];
    }
  });

  return result;
}
