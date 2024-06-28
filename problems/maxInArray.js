/**
 * Given an array of integers, return the max number present in the array
 * If the array is empty, return -1
 */
export const maxInArray = (arr) => {
  let i = 0;
  let n = arr.length;
  let max = arr[0];

  if (n == 0) {
    return -1;
  } else {
    while (i < n) {
      if (max < arr[i]) {
        max = arr[i];
      }
      i = i + 1;
    }
    return max;
  }
};
