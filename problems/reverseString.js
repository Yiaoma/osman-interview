/**
 * Given a string, return a new string with the reversed order of characters
 */
export const reverseString = (str) => {
  let n = str.length;
  let arr = str.split("");
  let i = 0;
  let new_str = str.split("");

  while (i < n) {
    new_str[i] = arr[n - 1 - i];
    i = i + 1;
  }

  new_str = new_str.join("");

  return new_str;
};

console.log(reverseString("Hello!"));
