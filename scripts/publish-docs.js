if (!process.env.TRAVIS_TAG) {
  throw new Error('This script can only be executed when a git tag is created');
}

const shelljs = require('shelljs');

const docsOrigin = 'origin-docs';
const docsBranch = 'latest/docs';

if (process.env.TRAVIS === 'true') {
  const userEmail = 'npmjs@commercetools.com';
  const userName = 'ct-release-bot';
  const remoteUrl = `https://${
    process.env.GH_TOKEN
  }@github.com/commercetools/ui-kit.git`;
  shelljs.exec(`git config --global user.email "${userEmail}"`);
  shelljs.exec(`git config --global user.name "${userName}"`);
  shelljs.exec(`git remote add ${docsOrigin} ${remoteUrl} > /dev/null 2>&1`);
}

shelljs.exec(`git checkout ${docsBranch}`);
shelljs.exec('git pull -r');
// This assumes that git is checked out at this branch tag.
shelljs.exec(`git merge ${process.env.TRAVIS_TAG}`);
shelljs.exec(`git push --force-with-lease ${docsOrigin} ${docsBranch}`);
