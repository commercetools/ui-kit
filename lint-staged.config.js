module.exports = {
  '*.md': ['prettier --write --parser markdown'],
  '*.yaml': ['prettier --write --parser yaml'],
  '*.json': ['prettier --write --parser json'],
  '*.js': [
    'yarn prettier --write',
    // NOTE: apparently if you pass some argument that is not a flag AFTER the `reporters`
    // flag, jest does not seem correctly parse the arguments.
    //
    //   No tests found related to files changed since last commit.
    //   Run Jest without `-o` or with `--all` to run all tests.
    //   Error: An error occurred while adding the reporter at path "/path/to/file".Reporter is not a constructor
    //
    // For that reason, we move the `--onlyChanged` flag next to it.
    'yarn lint:js --reporters=jest-silent-reporter --onlyChanged',
  ],
  '*.{ts,tsx}': [
    'yarn prettier --write',
    // NOTE: apparently if you pass some argument that is not a flag AFTER the `reporters`
    // flag, jest does not seem correctly parse the arguments.
    //
    //   No tests found related to files changed since last commit.
    //   Run Jest without `-o` or with `--all` to run all tests.
    //   Error: An error occurred while adding the reporter at path "/path/to/file".Reporter is not a constructor
    //
    // For that reason, we move the `--onlyChanged` flag next to it.
    'yarn lint:js --reporters=jest-silent-reporter --onlyChanged',
    // NOTE: lint-staged ignores tsconfig.json when called through husky hooks because husky passes filenames as an argument
    // calling tsc using function syntax allows tsc to use tsconfig.json,
    // causing tsc to have the same output as it would if it were called via `yarn typecheck`
    // see https://github.com/okonet/lint-staged/issues/825#issuecomment-620018284
    () => 'tsc --skipLibCheck --noEmit',
  ],
};
