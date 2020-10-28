import type { Options as PrettierOptions } from 'prettier';
import type { CommandFlags, GeneratorPackageJsonOptions } from './types';

import fs from 'fs';
import path from 'path';
import { findRootSync } from '@manypkg/find-root';
import { getPackagesSync } from '@manypkg/get-packages';
import rcfile from 'rcfile';
import prettier from 'prettier';
import omitEmpty from 'omit-empty-es';

const prettierConfig = rcfile<PrettierOptions>('prettier');

const transformDocument = (
  packageFolderPath: string,
  options: GeneratorPackageJsonOptions
) => {
  const packageFolderName = path.basename(packageFolderPath);
  const packageJsonPath = path.join(packageFolderPath, 'package.json');
  const relativePackageFolderPath = path.relative(
    options.workspaceRoot,
    packageFolderPath
  );
  const originalPackageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, { encoding: 'utf8' })
  );

  if (originalPackageJson.private === true) return;

  const npmScope =
    relativePackageFolderPath === 'presets/ui-kit'
      ? '@commercetools-frontend'
      : '@commercetools-uikit';

  const generatedPackageJson = {
    name: `${npmScope}/${packageFolderName}`,
    description: originalPackageJson.description,
    version: originalPackageJson.version,
    bugs: 'https://github.com/commercetools/ui-kit/issues',
    repository: {
      type: 'git',
      url: 'https://github.com/commercetools/ui-kit.git',
      directory: relativePackageFolderPath,
    },
    homepage: 'https://uikit.commercetools.com',
    keywords: ['javascript', 'design system', 'react', 'uikit'],
    license: 'MIT',
    private: false,
    publishConfig: {
      access: 'public',
    },
    sideEffects: false,
    main: originalPackageJson.main,
    module: originalPackageJson.module,
    files: originalPackageJson.files,
    scripts: originalPackageJson.scripts,
    dependencies: originalPackageJson.dependencies,
    devDependencies: originalPackageJson.devDependencies,
    peerDependencies: originalPackageJson.peerDependencies,
  };

  const formatted = prettier.format(
    JSON.stringify(omitEmpty(generatedPackageJson), null, 2),
    {
      ...prettierConfig,
      parser: 'json',
    }
  );

  if (options.dryRun) {
    console.log(formatted);
  } else {
    // Write the file to disk.
    fs.writeFileSync(packageJsonPath, formatted, { encoding: 'utf8' });
  }
};

export async function generate(
  relativePackagePath: string,
  flags: CommandFlags
) {
  const options: GeneratorPackageJsonOptions = {
    workspaceRoot: findRootSync(process.cwd()),
    dryRun: flags.dryRun,
  };

  if (flags.allWorkspacePackages) {
    const workspacePackages = getPackagesSync(process.cwd());
    workspacePackages.packages.forEach((packageInfo) => {
      transformDocument(packageInfo.dir, options);
    });
  } else {
    const packageFolderPath = path.resolve(process.cwd(), relativePackagePath);
    transformDocument(packageFolderPath, options);
  }
}
