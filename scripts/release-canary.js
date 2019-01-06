/* eslint-disable no-console */
const shelljs = require('shelljs');
const semver = require('semver');

const constants = {
  TRAVIS_COMMIT: 'TRAVIS_COMMIT',
  NPM_TOKEN: 'NPM_TOKEN',
  NPM_EMAIL: 'npmjs@commercetools.com',
  NPM_DIST_TAG: {
    CANARY: 'canary',
    NEXT: 'next',
  },
};

const exitOnError = result => {
  if (result.code > 0) {
    console.error(result.stderr);
    process.exit(1);
  }
};

const getVersionForDistTag = distTag => {
  const infoTagResult = shelljs.exec(
    `npm view @commercetools-frontend/ui-kit@${distTag} --json`,
    { silent: true }
  );
  exitOnError(infoTagResult);
  if (infoTagResult.stdout) {
    const infoTag = JSON.parse(infoTagResult.stdout);
    return infoTag.version;
  }
  return null;
};

const getNextCanaryVersion = () => {
  let versionTagCanary = getVersionForDistTag(constants.NPM_DIST_TAG.CANARY);
  if (!versionTagCanary) {
    // In case there was no `canary` dist-tag yet, we fall back to the
    // latest version in `next` dist-tag.
    versionTagCanary = getVersionForDistTag(constants.NPM_DIST_TAG.NEXT);
  }
  const nextVersionCanary = semver.inc(
    versionTagCanary,
    'prerelease',
    constants.NPM_DIST_TAG.CANARY
  );
  if (!nextVersionCanary) {
    console.error(
      `Could not bump version "${versionTagCanary}". Please check that the value is a valid semver version.`
    );
    process.exit(1);
  }
  return nextVersionCanary;
};

const getEnvVariable = name => {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required environment variable "${name}"`);
    process.exit(1);
  }
  return value;
};

const getGitSha = () => {
  if (process.env.CI) {
    return getEnvVariable(constants.TRAVIS_COMMIT);
  }
  return shelljs.exec('git rev-parse --short HEAD', { silent: true });
};

/* Run program */
const nextVersionCanary = getNextCanaryVersion();
const nextVersionCanaryWithGitSha = `${nextVersionCanary}+${getGitSha()}`;
console.log(
  '==> About to release canary version:',
  nextVersionCanaryWithGitSha
);
if (process.env.CI) {
  const authToken = getEnvVariable(constants.NPM_TOKEN);
  console.log(`==> Granting publish access to user "${constants.NPM_EMAIL}"`);
  shelljs.exec(`npm config set email ${constants.NPM_EMAIL}`, { silent: true });
  shelljs.exec(
    `npm config set '//registry.npmjs.org/:_authToken' ${authToken}`,
    { silent: true }
  );
}
shelljs.exec(`npm version ${nextVersionCanaryWithGitSha} --no-git-tag-version`);
shelljs.exec(`npm publish --tag ${constants.NPM_DIST_TAG.CANARY}`);
