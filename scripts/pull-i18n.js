const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const rcfile = require('rcfile');
const prettier = require('prettier');

const prettierConfig = rcfile('prettier');

const writeFile = (filePath, data) => {
  const prettifiedData = prettier.format(JSON.stringify(data, null, 2), {
    ...prettierConfig,
    parser: 'json',
  });
  fs.writeFileSync(filePath, prettifiedData, 'utf8');
};
const parseFile = filePath => JSON.parse(fs.readFileSync(filePath, 'utf8'));

// 1. Pull reviewed translations
console.log('=> Pulling from transifex');
shell.exec(`tx pull --mode onlyreviewed`);

// 2. Overwrite `core.json` with values from `en.json`
// This is to ensure that reviewed translations are reflected on Core + Application translations has the same reference,
// as we add new languages
const enLocaleData = parseFile(path.join(__dirname, '../i18n', 'en.json'));
const coreData = parseFile(path.join(__dirname, '../i18n', 'core.json'));
const nextCoreData = Object.entries(coreData).reduce((nextCore, [coreKey]) => {
  if (enLocaleData[coreKey]) {
    return {
      ...nextCore,
      [coreKey]: enLocaleData[coreKey],
    };
  }
  return nextCore;
}, coreData);
console.log('=> syncing `en.json` with `core.json`');
writeFile(path.join(__dirname, '../i18n', `core.json`), nextCoreData);
