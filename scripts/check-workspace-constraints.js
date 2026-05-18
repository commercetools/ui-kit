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
 *    consumed via `catalog:` in workspace `dependencies` / `devDependencies`.
 * 6. Every dep listed under `catalogs.peer:` in pnpm-workspace.yaml must be
 *    consumed via `catalog:peer` in workspace `peerDependencies`.
 *    Literal versions on a cataloged dep are an error in either case.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPO_URL = 'https://github.com/commercetools/ui-kit.git';

// Parse the `catalog:` (default) and `catalogs.<name>:` (named) blocks from
// pnpm-workspace.yaml. Minimal parser scoped to the shape we use — key:value
// entries with optional single-quoted keys. Avoids pulling a YAML lib into a
// root-only script.
function readCatalogs() {
  const yaml = fs.readFileSync(path.join(ROOT, 'pnpm-workspace.yaml'), 'utf-8');
  const lines = yaml.split('\n');
  const out = { default: new Set(), named: new Map() };

  const indentOf = (l) => l.match(/^( *)/)[1].length;
  const entryKey = (l) => {
    const m = l.match(/^\s+'?([^'":\s]+)'?\s*:/);
    return m ? m[1] : null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^catalog:\s*$/.test(line)) {
      for (let j = i + 1; j < lines.length; j++) {
        const inner = lines[j];
        if (inner.trim() === '' || /^\S/.test(inner)) break;
        const k = entryKey(inner);
        if (k) out.default.add(k);
      }
    } else if (/^catalogs:\s*$/.test(line)) {
      // Each child at the next indent level (2 spaces) is a named catalog.
      for (let j = i + 1; j < lines.length; j++) {
        const inner = lines[j];
        if (inner.trim() === '' || /^\S/.test(inner)) break;
        const ind = indentOf(inner);
        if (ind === 2) {
          const nm = inner.trim().replace(/:$/, '');
          if (!out.named.has(nm)) out.named.set(nm, new Set());
          // collect deeper-indented entries until indent drops back
          for (let k = j + 1; k < lines.length; k++) {
            const e = lines[k];
            if (e.trim() === '') break;
            const eInd = indentOf(e);
            if (eInd <= 2) break;
            const ek = entryKey(e);
            if (ek) out.named.get(nm).add(ek);
          }
        }
      }
    }
  }
  return out;
}

const catalogs = readCatalogs();
const defaultCatalogKeys = catalogs.default;
const peerCatalogKeys = catalogs.named.get('peer') || new Set();

// Get all workspace packages via pnpm
const workspaces = JSON.parse(
  execSync('pnpm ls --json -r --depth -1', { cwd: ROOT, encoding: 'utf-8' })
);

const errors = [];

// Pass 2 accumulators: depName -> Map<spec, Set<workspaceLabel>>.
// Split by section group because the default catalog applies to install
// specifiers (dependencies + devDependencies) and the named `peer` catalog
// applies to peerDependencies — semantically distinct.
const installUsage = new Map();
const peerUsage = new Map();

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
  // (internal links). Split install (deps + devDeps) from peer.
  const addUsage = (map, name, spec) => {
    if (!map.has(name)) map.set(name, new Map());
    const bySpec = map.get(name);
    if (!bySpec.has(spec)) bySpec.set(spec, new Set());
    bySpec.get(spec).add(label);
  };
  for (const section of ['dependencies', 'devDependencies']) {
    const sectionDeps = pkg[section] || {};
    for (const [name, spec] of Object.entries(sectionDeps)) {
      if (typeof spec !== 'string' || spec.startsWith('workspace:')) continue;
      addUsage(installUsage, name, spec);
    }
  }
  const peerDeps = pkg.peerDependencies || {};
  for (const [name, spec] of Object.entries(peerDeps)) {
    if (typeof spec !== 'string' || spec.startsWith('workspace:')) continue;
    addUsage(peerUsage, name, spec);
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

// Pass 2: cataloged deps must be referenced via their catalog. Literal
// versions on a cataloged dep are an error — the catalog is the single
// source of truth, and skipping the reference re-introduces the version
// drift this rule exists to prevent.
function enforceCatalog(catalogKeys, usage, expectedSpec, ruleName) {
  for (const name of catalogKeys) {
    const bySpec = usage.get(name);
    if (!bySpec) continue;
    for (const [spec, workspaceLabels] of bySpec) {
      if (spec === expectedSpec) continue;
      for (const label of workspaceLabels) {
        errors.push(
          `${label}: "${name}" must use "${expectedSpec}" (got ${JSON.stringify(
            spec
          )}); ${ruleName} version is declared in pnpm-workspace.yaml`
        );
      }
    }
  }
}

enforceCatalog(defaultCatalogKeys, installUsage, 'catalog:', 'default catalog');
enforceCatalog(peerCatalogKeys, peerUsage, 'catalog:peer', 'peer catalog');

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
