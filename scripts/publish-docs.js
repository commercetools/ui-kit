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
} else {
  // This part is in case you run the script locally, in which case you don't
  // need the `GH_TOKEN` and can simply use the ssh remote.
  const remoteUrl = 'git@github.com:commercetools/ui-kit.git';
  shelljs.exec(`git remote add ${docsOrigin} ${remoteUrl} > /dev/null 2>&1`);
}

// Make sure there is no existing docs branch locally
shelljs.exec(`git branch -D ${docsBranch} > /dev/null 2>&1`);
// Checkout a new local branch for `latest/docs`
shelljs.exec(`git checkout -b ${docsBranch}`);
shelljs.exec(`git push --force ${docsOrigin} ${docsBranch}`);
// Switch back to the previous branch (e.g. `master`)
shelljs.exec(`git checkout -`);
