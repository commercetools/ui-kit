#!/usr/bin/env node

/* eslint-disable no-console */

const cac = require('cac').cac;
const path = require('path');
const fs = require('fs');
const replace = require('replace');

const cli = cac('version');

const versionOfPackage = process.env.npm_package_version;
const nameOfPackage = process.env.npm_package_name;

const execute = async () => {
  cli.command('').action(cli.outputHelp);

  cli.command('print', 'Prints the version and package name').action(() => {
    console.log(
      `Version for ${nameOfPackage} of release will be ${versionOfPackage}`
    );
  });

  cli
    .command('replace', 'Replaces the version to the built files')
    .action(() => {
      const pkgDirectory = fs.realpathSync(process.cwd());
      const resolvePkg = (relativePath) =>
        path.resolve(pkgDirectory, relativePath);

      const paths = [resolvePkg('dist')];

      replace({
        regex: '__@UI_KIT_PACKAGE/VERSION_OF_RELEASE__',
        replacement: versionOfPackage,
        paths,
        recursive: true,
        silent: true,
      });

      console.log(
        `Replaced placeholder for ${nameOfPackage} and release ${versionOfPackage}`
      );
    });

  cli.help();

  cli.parse(process.argv, { run: false });

  await cli.runMatchedCommand();
};

execute().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
