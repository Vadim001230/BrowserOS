function sumTree(tree) {
  let sum = tree.valueNode;

  if (tree.next) {
    tree.next.forEach((node) => {
      sum += sumTree(node);
    });
  }

  return sum;
}

module.exports = sumTree;
