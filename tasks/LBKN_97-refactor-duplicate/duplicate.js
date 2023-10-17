function duplicate(arr, count) {
  if (count <= 0) return [];
  const result = new Array(+count);
  return result.fill(arr);
}
