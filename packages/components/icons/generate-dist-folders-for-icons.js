const { kebabCase } = require('lodash');
const fs = require('node:fs');
const path = require('node:path');
const PackageJson = require('@npmcli/package-json');
const cac = require('cac').cac;

const cli = cac('generate-entrypoints');

cli
  .command(
    '[...files]',
    'generates folders and package.json for each generated icon file to enable them to be bundled individually with preconstruct'
  )
  .action(async (files, options) => {
    if (!files) {
      return console.log('you must pass a glob to parse');
    }

    const folders = files.map(
      (file) =>
        `/${path.relative(
          'src',
          file.slice(0, file.length - path.extname(file).length)
        )}`
    );

    const rootFolder = path.dirname(folders[0]).split(path.sep)[1];
    const currentDir = fs.realpathSync(process.cwd());
    const rootDir = `${currentDir}/${rootFolder}`;

    fs.rmSync(rootDir, { recursive: true, force: true });

    const rootPkgJson = await PackageJson.load(currentDir);
    await Promise.all(
      folders.map(async (folder) => {
        const pkgDir = `${currentDir}${folder}`;
        const bundleName = `dist/${kebabCase(
          `${rootPkgJson.content.name}/${rootFolder}`
        )}-${path.basename(folder)}`;

        fs.mkdirSync(pkgDir, { recursive: true });
        const pkgJson = await PackageJson.create(pkgDir);
        pkgJson.update({
          main: `${bundleName}.cjs.js`,
          module: `${bundleName}.esm.js`,
        });
        await pkgJson.save();
        return console.log(`added folder and package.json for ${folder}`);
      })
    );
  });

cli.help();

cli.parse();
