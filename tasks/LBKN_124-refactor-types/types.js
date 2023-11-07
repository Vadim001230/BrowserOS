function calculateCountTypes(arr) {
  const typesCount = {};

  for (const item of arr) {
    const itemType = typeof item;
    if (itemType in typesCount) {
      typesCount[itemType]++;
    } else {
      typesCount[itemType] = 1;
    }
  }

  return typesCount;
}
