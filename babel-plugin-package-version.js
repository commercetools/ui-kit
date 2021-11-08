const { sync: findUpSync } = require('find-up');

const pluginReplacePackageVersion = function (babel) {
  return {
    visitor: {
      StringLiteral(path, state) {
        if (path.node.value === '__@UI_KIT_PACKAGE/VERSION_OF_RELEASE__') {
          const packageJsonPath = findUpSync('package.json', {
            cwd: state.file.opts.filename,
          });
          const { version } = require(packageJsonPath);
          path.replaceWith(babel.types.valueToNode(version));
        }
      },
    },
  };
};

module.exports = pluginReplacePackageVersion;
