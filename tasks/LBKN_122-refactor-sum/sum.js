const sumOfArr = (arr) => arr.reduce((acc, val) => typeof val === 'number' ? acc + val : acc, 0);
