export const splitArray = (arr, n, balanced) => {
  if (n < 2) return [arr];

  var len = arr.length,
    out = [],
    i = 0,
    size;

  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(arr.slice(i, (i += size)));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(arr.slice(i, (i += size)));
    }
  } else {
    n--;
    size = Math.floor(len / n);

    if (len % size === 0) size--;
    while (i < size * n) {
      out.push(arr.slice(i, (i += size)));
    }
    out.push(arr.slice(size * n));
  }

  return out;
};
