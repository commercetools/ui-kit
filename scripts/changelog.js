require('dotenv').config();
const shelljs = require('shelljs');

shelljs.exec('yarn run lerna-changelog');
