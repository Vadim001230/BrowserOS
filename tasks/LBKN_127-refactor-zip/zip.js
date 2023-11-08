function zipArrays(arr1 = [], arr2 = []) {
  const result = [];
  arr1.forEach((el, i) => {
    if (arr2[i]) {
      result.push([el, arr2[i]]);
    }
  });

  return result;
}
