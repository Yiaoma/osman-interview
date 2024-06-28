/**
 * Implement a function that returns the sum of two numbers
 * sum(a)(b);
 */
export const sum = (a) => {
  return function (b) {
    return a + b;
  };
};
