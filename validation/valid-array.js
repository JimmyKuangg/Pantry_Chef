const validArray = arr => {
  return Array.isArray(arr) && arr.length > 0;
}

module.exports = validArray;