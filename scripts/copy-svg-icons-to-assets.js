const path = require('path');
const shelljs = require('shelljs');

shelljs.mkdir('-p', path.join(__dirname, '../docs/assets/icons'));
shelljs.cp(
  '-R',
  path.join(__dirname, '../src/components/icons/svg/*'),
  path.join(__dirname, '../docs/assets/icons')
);
