module.exports = {
  hooks: {
    'commit-msg': 'commitlint -e $HUSKY_GIT_PARAMS',
    'pre-commit': 'yarn i18n:compile && lint-staged',
  },
};
