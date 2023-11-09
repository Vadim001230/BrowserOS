function zipArrays(arr1 = [], arr2 = []) {
  const result = [];
  const minLength = Math.min(arr1.length, arr2.length);

  for (let i = 0; i < minLength; i++) {
    result.push([arr1[i], arr2[i]]);
  }

  return result;
}
