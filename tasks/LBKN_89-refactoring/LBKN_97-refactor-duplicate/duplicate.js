function duplicate(arr, count) {
  return count > 0 ? new Array(+count).fill(arr) : [];
}
