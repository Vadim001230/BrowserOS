function removeValuesFromArray(arr, ...values) {
  for (const value of values) {
    const index = arr.indexOf(value);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }

  return arr;
}
