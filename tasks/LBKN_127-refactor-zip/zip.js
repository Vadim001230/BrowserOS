function zipArrays(arr1 = [], arr2 = []) {
  let i = 0;
  for (el of arr2) {
    arr2[i] = [arr1[i], el];
    if (arr1[i] === undefined) {
      arr2.length -= 1;
    }
    i++;
  }

  return arr2;
}
