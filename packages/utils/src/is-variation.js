// Filters out only variations by detecting a number in the color name
module.exports = function isVariation(colorName) {
  return /[0-9]/.test(colorName);
};
