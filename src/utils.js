function ns(path, module) {
  return path.split('.').reduce(
    function (prevVal, currVal, currIndex, array) {
      return prevVal[currVal] =
        prevVal[currVal] ||
        (currIndex === array.length - 1 ? module() : {});
    },
    window
  );
}
