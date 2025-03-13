#!/usr/bin/env node

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

import type { CommandFlags } from '../src/types';
import { program } from 'commander';
import { generate } from '../src/index';

program
  .name('generate-readme')
  .argument(
    '[path-to-package]',
    'The path to the package for which the README.md file should be generated. \nThis assumes that the path is the package folder containing a "package.json".'
  )
  .option(
    '--all-workspace-packages',
    '(optional) Run the script to all workspace packages. The "path-to-package" option is ignored.'
  )
  .option(
    '--dry-run',
    '(optional) Simulate a run, the generated content will be printed to stdout.',
    false
  )
  .action((pathToPackage: string, options: CommandFlags) => {
    const hasRequiredArguments = options.allWorkspacePackages || pathToPackage;

    if (!hasRequiredArguments) {
      program.error(
        `Either a path to a package or the "--all-workspace-packages" option must be defined.`
      );
    }

    generate(pathToPackage, options).catch((error) => {
      console.error(error);
      process.exit(1);
    });
  });

program.parse();
