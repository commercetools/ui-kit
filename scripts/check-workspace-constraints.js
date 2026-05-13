#!/usr/bin/env node
/**
 * Checks workspace package.json constraints that were previously enforced
 * by Yarn's constraints.pro. Replaces that Prolog-based system for pnpm.
 *
 * Rules:
 * 1. Public packages must have "license": "MIT"; private packages must not.
 * 2. Public packages must have correct repository fields; private packages must not.
 * 3. Public packages must have publishConfig.access = "public"; private packages must not.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPO_URL = 'https://github.com/commercetools/ui-kit.git';

// Get all workspace packages via pnpm
const workspaces = JSON.parse(
  execSync('pnpm ls --json -r --depth -1', { cwd: ROOT, encoding: 'utf-8' })
);

const errors = [];

for (const ws of workspaces) {
  const pkgPath = path.join(ws.path, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const rel = path.relative(ROOT, ws.path);
  const label = `${pkg.name} (${rel}/package.json)`;
  const isPrivate = pkg.private === true;

  if (isPrivate) {
    // Private packages must NOT have license, repository, or publishConfig
    if (pkg.license != null) {
      errors.push(`${label}: private package must not have "license" field`);
    }
    if (pkg.repository != null) {
      errors.push(`${label}: private package must not have "repository" field`);
    }
    if (pkg.publishConfig != null) {
      errors.push(
        `${label}: private package must not have "publishConfig" field`
      );
    }
  } else {
    // Public packages must have license = "MIT"
    if (pkg.license !== 'MIT') {
      errors.push(
        `${label}: public package must have "license": "MIT" (got ${JSON.stringify(
          pkg.license
        )})`
      );
    }

    // Public packages must have correct repository fields
    const repo = pkg.repository;
    if (!repo || typeof repo !== 'object') {
      errors.push(`${label}: public package must have a "repository" object`);
    } else {
      if (repo.type !== 'git') {
        errors.push(
          `${label}: repository.type must be "git" (got ${JSON.stringify(
            repo.type
          )})`
        );
      }
      if (repo.url !== REPO_URL) {
        errors.push(
          `${label}: repository.url must be "${REPO_URL}" (got ${JSON.stringify(
            repo.url
          )})`
        );
      }
      if (repo.directory !== rel) {
        errors.push(
          `${label}: repository.directory must be "${rel}" (got ${JSON.stringify(
            repo.directory
          )})`
        );
      }
    }

    // Public packages must have publishConfig.access = "public"
    const pc = pkg.publishConfig;
    if (!pc || typeof pc !== 'object') {
      errors.push(
        `${label}: public package must have "publishConfig": { "access": "public" }`
      );
    } else if (pc.access !== 'public') {
      errors.push(
        `${label}: publishConfig.access must be "public" (got ${JSON.stringify(
          pc.access
        )})`
      );
    }
  }
}

if (errors.length > 0) {
  console.error(`Found ${errors.length} workspace constraint violation(s):\n`);
  for (const err of errors) {
    console.error(`  ✗ ${err}`);
  }
  process.exit(1);
} else {
  console.log('All workspace constraints passed.');
  process.exit(0);
}
