/**
 * Given an integer n, return a string
 * return "FizzBuzz" if n is divisible by 3 and 5
 * return "Fizz" if n is divisible by 3
 * return "Buzz" if n is divisible by 5
 * return n if n is not divisible by 3 or 5
 */
export const fizzBuzz = (n) => {
  if (n % 3 == 0 && n % 5 == 0) {
    return "FizzBuzz";
  } else if (n % 3 == 0) {
    return "Fizz";
  } else if (n % 5 == 0) {
    return "Buzz";
  } else return n;
};
