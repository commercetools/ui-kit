#!/usr/bin/env node

/* eslint-disable no-console */

const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const replace = require('replace');

program.name('version');

const versionOfPackage = process.env.npm_package_version;
const nameOfPackage = process.env.npm_package_name;

const execute = async () => {
  program
    .command('print')
    .description('Prints the version and package name')
    .action(() => {
      console.log(
        `Version for ${nameOfPackage} of release will be ${versionOfPackage}`
      );
    });

  program
    .command('replace')
    .description('Replaces the version to the built files')
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

  program.parse();
};

execute().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
