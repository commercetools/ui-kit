#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { getPackagesSync } from '@manypkg/get-packages';

if (!process.env.VERCEL) {
  console.log(`This script can only run on Vercel. Aborting.`);
  process.exit(0);
}

console.log('Creating symlinks of all public packages into root node_modules.');

const workspacePackages = getPackagesSync(process.cwd());

const nodeModulesPath = path.join(workspacePackages.root.dir, 'node_modules');
fs.mkdirSync(nodeModulesPath, { recursive: true });

workspacePackages.packages.forEach((workspace) => {
  const targetPath = path.join(nodeModulesPath, workspace.packageJson.name);
  const [scope] = workspace.packageJson.name.split('/');

  if (workspace.packageJson.private) {
    console.log(
      `Private package ${workspace.packageJson.name}, skipping symlink.`
    );
  } else {
    console.log(
      `Symlinking package ${workspace.packageJson.name} at ${workspace.dir} to ${targetPath}`
    );

    fs.mkdirSync(path.join(nodeModulesPath, scope), { recursive: true });
    fs.symlinkSync(workspace.dir, targetPath, 'dir');
  }
});
