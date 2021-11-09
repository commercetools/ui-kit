// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

import type { CommandFlags } from '../src/types';

import mri from 'mri';
import report from 'vfile-reporter';
import { generate } from '../src/index';

const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });
const [pathToPackage] = flags._;

const dryRun: boolean = flags['dry-run'] ? true : false;
const allWorkspacePackages: boolean = flags['all-workspace-packages']
  ? true
  : false;
const hasRequiredArguments = allWorkspacePackages || pathToPackage;

if (flags.help || !hasRequiredArguments) {
  console.log(`
  Usage: generate-readme [path-to-package] [options]

  Displays help information.

  [path-to-package]
    The path to the package for which the README.md file should be generated.
    This assumes that the path is the package folder containing a "package.json".

  Options:
    --all-workspace-packages      (optional) Run the script to all workspace packages. The "path-to-package" option is ignored.
    --dry-run                     (optional) Simulate a run, the generated content will be printed to stdout.
  `);
  process.exit(0);
}

const options: CommandFlags = {
  dryRun,
  allWorkspacePackages,
};

generate(pathToPackage, options).catch((error) => {
  console.error(report(error));
  process.exit(1);
});
