const formatMarkdown = ['npm run format:md', 'git add'];
const formatJs = [
  // NOTE: apparently if you pass some argument that is not a flag AFTER the `reporters`
  // flag, jest does not seem correctly parse the arguments.
  //
  //   No tests found related to files changed since last commit.
  //   Run Jest without `-o` or with `--all` to run all tests.
  //   Error: An error occurred while adding the reporter at path "/path/to/file".Reporter is not a constructor
  //
  // For that reason, we move the `--onlyChanged` flag next to it.
  'npm run lint:js -- --reporters=jest-silent-reporter --onlyChanged',
];
const formatCss = [
  // NOTE: apparently if you pass some argument that is not a flag AFTER the `reporters`
  // flag, jest does not seem correctly parse the arguments.
  //
  //   No tests found related to files changed since last commit.
  //   Run Jest without `-o` or with `--all` to run all tests.
  //   Error: An error occurred while adding the reporter at path "/path/to/file".Reporter is not a constructor
  //
  // For that reason, we move the `--onlyChanged` flag next to it.
  'npm run lint:css -- --reporters=jest-silent-reporter --onlyChanged',
];

module.exports = {
  '{.github,.storybook,examples,materials,src}/**/*.md': formatMarkdown,
  './*.md': formatMarkdown,

  '{.storybook,examples,materials,scripts,src}/**/*.js': formatJs,
  './*.js': formatJs,

  'materials/*.css': formatCss,
  '{.storybook,examples,materials,src}/**/*.css': formatCss,
};
