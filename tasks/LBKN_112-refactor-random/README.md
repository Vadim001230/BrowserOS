# Привести в порядок код random.js

```
// Generate random integer value in given range

Random = (min, max) => {
if ( max === undefined ){;
    max = min; return Math.floor(Math.random() * (max + 1));
    ;} else {;
    return min + Math.floor(Math.random() * (max - min + 1));
};
};
```
