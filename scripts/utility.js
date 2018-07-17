// Filters out only variations by detecting a number in the color name
exports.isVariation = function(colorName) {
  return /[0-9]/.test(colorName);
};
