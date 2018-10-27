const path = require('path');

module.exports = function replaceImport(originalPath, callingFileName) {
  if (originalPath === 'ui-kit' && callingFileName.endsWith('.bundlespec.js')) {
    const fromPath = path.dirname(callingFileName);
    const toPath = process.cwd();
    const relativePath = path.relative(fromPath, toPath);
    return relativePath;
  }
  return originalPath;
};
