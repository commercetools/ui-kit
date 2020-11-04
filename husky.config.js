module.exports = {
  hooks: {
    'commit-msg': 'commitlint -e $HUSKY_GIT_PARAMS',
    'pre-commit':
      'yarn generate-package-json --all-workspace-packages && lint-staged',
  },
};
