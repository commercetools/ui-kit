#!/usr/bin/env node

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

import type { CommandFlags } from '../src/types';
import { cac } from 'cac';
import { generate } from '../src/index';

const cli = cac('generate-package-json');

cli
  .command(
    '[path-to-package]',
    'The path to the package for which the package.json file should be generated.'
  )
  .option(
    '--all-workspace-packages',
    '(optional) Run the script to all workspace packages. The "path-to-package" option is ignored.'
  )
  .option(
    '--dry-run',
    '(optional) Simulate a run, the generated content will be printed to stdout.'
  )
  .action((pathToPackage: string, options: CommandFlags) => {
    const hasRequiredArguments = options.allWorkspacePackages || pathToPackage;

    if (!hasRequiredArguments) {
      cli.outputHelp();
      process.exit(0);
    }

    generate(pathToPackage, options).catch((error) => {
      console.error(error);
      process.exit(1);
    });
  });

cli.help();

cli.parse();
