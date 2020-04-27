// Given a string, validates that it has the correct format
// to be a number, with decimal separators and negative sign.
export default function isNumberish(number) {
  return !/[^(\-?)\d,.\s]/.test(number);
}
