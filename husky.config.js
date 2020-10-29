module.exports = {
  hooks: {
    'commit-msg': 'commitlint -e $HUSKY_GIT_PARAMS',
    'pre-commit':
      'lint-staged && yarn generate-package-json --all-workspace-packages',
  },
};
