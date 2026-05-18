#!/usr/bin/env node
/**
 * Checks workspace package.json constraints that were previously enforced
 * by Yarn's constraints.pro. Replaces that Prolog-based system for pnpm.
 *
 * Per-package rules (Pass 1):
 * 1. Public packages must have "license": "MIT"; private packages must not.
 * 2. Public packages must have correct repository fields; private packages must not.
 * 3. Public packages must have publishConfig.access = "public"; private packages must not.
 * 4. A dependency must not appear in both "dependencies" and "devDependencies".
 *
 * Cross-workspace rules (Pass 2):
 * 5. Every dep listed under `catalog:` in pnpm-workspace.yaml must be
 *    consumed via the `catalog:` reference in every workspace using it.
 *    Literal versions on a cataloged dep are an error.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPO_URL = 'https://github.com/commercetools/ui-kit.git';

// Parse the `catalog:` block from pnpm-workspace.yaml. Minimal parser scoped
// to the shape we use (default catalog only, key:value entries, optionally
// single-quoted keys). Avoids pulling a YAML lib into a root-only script.
function readCatalogKeys() {
  const yaml = fs.readFileSync(path.join(ROOT, 'pnpm-workspace.yaml'), 'utf-8');
  const lines = yaml.split('\n');
  const start = lines.findIndex((l) => /^catalog:\s*$/.test(l));
  if (start === -1) return new Set();
  const keys = new Set();
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '' || /^\S/.test(line)) break; // end of block
    const m = line.match(/^\s+'?([^'":\s]+)'?\s*:/);
    if (m) keys.add(m[1]);
  }
  return keys;
}

const catalogKeys = readCatalogKeys();

// Get all workspace packages via pnpm
const workspaces = JSON.parse(
  execSync('pnpm ls --json -r --depth -1', { cwd: ROOT, encoding: 'utf-8' })
);

const errors = [];

// Pass 2 accumulator: depName -> Map<spec, Set<workspaceLabel>>
const usage = new Map();

for (const ws of workspaces) {
  const pkgPath = path.join(ws.path, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const rel = path.relative(ROOT, ws.path);
  const label = `${pkg.name} (${rel}/package.json)`;
  const isPrivate = pkg.private === true;

  // Applies to both public and private packages: a dependency must not
  // appear in both "dependencies" and "devDependencies".
  const deps = Object.keys(pkg.dependencies || {});
  const devDeps = new Set(Object.keys(pkg.devDependencies || {}));
  for (const dep of deps) {
    if (devDeps.has(dep)) {
      errors.push(
        `${label}: "${dep}" appears in both "dependencies" and "devDependencies" (remove from "devDependencies")`
      );
    }
  }

  // Accumulate cross-workspace dep usage for Pass 2. Skip workspace: refs
  // (internal links) and consider only the three dep sections.
  for (const section of [
    'dependencies',
    'devDependencies',
    'peerDependencies',
  ]) {
    const sectionDeps = pkg[section] || {};
    for (const [name, spec] of Object.entries(sectionDeps)) {
      if (typeof spec !== 'string' || spec.startsWith('workspace:')) continue;
      if (!usage.has(name)) usage.set(name, new Map());
      const bySpec = usage.get(name);
      if (!bySpec.has(spec)) bySpec.set(spec, new Set());
      bySpec.get(spec).add(label);
    }
  }

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

// Pass 2: every dep listed under `catalog:` in pnpm-workspace.yaml must be
// consumed via "catalog:" in every workspace that declares it. Literal
// versions on a cataloged dep are an error — the catalog is the single
// source of truth for the version, and skipping the reference re-introduces
// the version-drift this rule exists to prevent.
for (const name of catalogKeys) {
  const bySpec = usage.get(name);
  if (!bySpec) continue;
  for (const [spec, workspaceLabels] of bySpec) {
    if (spec === 'catalog:') continue;
    for (const label of workspaceLabels) {
      errors.push(
        `${label}: "${name}" must use "catalog:" (got ${JSON.stringify(
          spec
        )}); the version is declared in pnpm-workspace.yaml`
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
