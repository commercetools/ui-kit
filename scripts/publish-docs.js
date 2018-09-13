const shelljs = require('shelljs');

if (!process.env.TRAVIS_TAG) {
  throw new Error('This script can only be executed when a git tag is created');
}

if (process.env.TRAVIS === 'true') {
  const remoteUrl = `https://${
    process.env.GH_TOKEN
  }@github.com/commercetools/ui-kit.git`;
  shelljs.exec('git config --global user.email "npmjs@commercetools.com"');
  shelljs.exec('git config --global user.name "ct-release-bot"');
  shelljs.exec(`git remote add origin-docs ${remoteUrl} > /dev/null 2>&1`);
}

shelljs.exec('git checkout docs-production');
shelljs.exec('git pull -r');
// This assumes that git is checked out at this branch tag.
shelljs.exec(`git merge ${process.env.TRAVIS_TAG}`);
shelljs.exec('git push --force-with-lease origin-docs docs-production');
