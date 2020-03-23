#!/usr/bin/env node

/* eslint-disable no-console */

const mri = require('mri');
const path = require('path');
const fs = require('fs');
const replace = require('replace');

const versionOfPackage = process.env.npm_package_version;
const nameOfPackage = process.env.npm_package_name;

const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });
const commands = flags._;

if (commands.length === 0 || (flags.help && commands.length === 0)) {
  console.log(`
    Usage: version [command] [options]
    Commands:
      print        Prints the version and package name
      replace      Replaces the version to the built files
  `);
  process.exit(0);
}

const command = commands[0];

switch (command) {
  case 'print': {
    console.log(
      `Version for ${nameOfPackage} of release will be ${versionOfPackage}`
    );
    break;
  }
  case 'replace': {
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
    break;
  }
  default:
    console.log(`Unknown command "${command}".`);
    break;
}
