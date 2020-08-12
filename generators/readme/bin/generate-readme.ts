#!/usr/bin/env node

import mri from 'mri';
import report from 'vfile-reporter';
import { generate } from '../src/index';
import { CommandFlags } from '../src/types';

const flags = mri(process.argv.slice(2), {
  alias: { help: ['h'], boolean: ['dry-run'] },
});
const [pathToPackage] = flags._;

const dryRun: boolean = flags['dry-run'] ? true : false;

if (flags.help || !pathToPackage) {
  console.log(`
  Usage: generate-readme [path-to-package] [options]

  Displays help information.

  [path-to-package]
    The path to the package for which the README.md file should be generated.
    This assumes that the path is the package folder containing a "package.json".

  Options:
    --dry-run  (optional) Simulate a run, the generated content will be printed to stdout.
  `);
  process.exit(0);
}

const options: CommandFlags = {
  dryRun,
};

generate(pathToPackage, options).catch((error) => {
  console.error(report(error));
  process.exit(1);
});
