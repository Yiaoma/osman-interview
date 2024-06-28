/**
 * Given a string, return the number of vowels present in the string
 * Vowels are "a", "e", "i", "o", "u"
 */
export const countVowels = (str) => {
  let i = 0;
  let n = str.length;
  let count = 0;

  str = str.toUpperCase();

  let arr = str.split("");

  while (i < n) {
    switch (arr[i]) {
      case "A":
        count = count + 1;
        break;
      case "E":
        count = count + 1;
        break;
      case "I":
        count = count + 1;
        break;
      case "O":
        count = count + 1;
        break;
      case "U":
        count = count + 1;
        break;
      default:
        break;
    }
    i = i + 1;
  }

  return count;
};
