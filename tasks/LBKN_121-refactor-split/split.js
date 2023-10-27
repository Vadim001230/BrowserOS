function splitArray(index, arr) {
  return ([firstPart, secondPart] = [
    arr.slice(0, index),
    arr.slice(index, arr.length),
  ]);
}
