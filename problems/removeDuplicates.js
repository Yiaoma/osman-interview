/**
 * Given an array of integers, return new array with duplicates removed
 */
export const removeDuplicates = (arr) => {
  let i = 0;
  let j = 0;
  let n = arr.length;

  while (i < n) {
    j = i + 1;
    while (j < n) {
      if (arr[i] == arr[j]) {
        delete arr[j];
      }
      j = j + 1;
    }
    i = i + 1;
  }

  n = arr.length;
  i = 0;

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      result.push(arr[i]);
    }
  }

  console.log(result);
  return result;
};
