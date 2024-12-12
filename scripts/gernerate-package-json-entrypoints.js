const { globSync } = require('glob');
const fs = require('node:fs');
const path = require('node:path');
const PackageJson = require('@npmcli/package-json');
const cac = require('cac').cac;

const cli = cac('entrypoints');

cli
  .command(
    '[...globs]',
    'generates preconstruct entrypoints declaration in package.json for all specified globs'
  )
  .action(async (globs, options) => {
    if (!globs) {
      return console.log('you must pass a glob to parse');
    }

    const entrypoints = globs.map((glob) => `./${path.relative('src', glob)}`);
    console.log(entrypoints);
    if (!entrypoints) {
      return console.log(`no files to parse for globs ${globs}`);
    }
    const currentDir = fs.realpathSync(process.cwd());

    const pkgJson = await PackageJson.load(currentDir);

    pkgJson.update({
      preconstruct: {
        ...pkgJson.content.preconstruct,
        entrypoints: [
          ...pkgJson.content.preconstruct.entrypoints,
          ...entrypoints,
        ],
      },
    });

    await pkgJson.save();
  });

cli.help();

cli.parse();
