const validArray = arr => {
  return typeof arr === "array" && arr.length > 0;
}

module.exports = validArray;