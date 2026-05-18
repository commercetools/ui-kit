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
 * 5. Every dep listed under `catalog:` (default) in pnpm-workspace.yaml must
 *    be consumed via `catalog:` in workspace `dependencies` / `devDependencies`.
 * 6. Every dep listed under a named catalog `catalogs.<name>:` must be
 *    consumed via `catalog:<name>` in workspace `dependencies` /
 *    `devDependencies`.
 * 7. Every dep listed under `catalogs.peer:` must be consumed via
 *    `catalog:peer` in workspace `peerDependencies`.
 *    Literal versions on a cataloged dep are an error in all three cases.
 * 8. Drift: an uncataloged external dep used at two or more distinct
 *    specifiers across workspaces is an error — add it to a catalog so
 *    the version is centrally controlled. Install (deps + devDeps) and
 *    peer drift are checked separately.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPO_URL = 'https://github.com/commercetools/ui-kit.git';

// Parse the `catalog:` (default) and `catalogs.<name>:` (named) blocks from
// pnpm-workspace.yaml. Minimal parser scoped to the shape we use — key:value
// entries with optional single-quoted keys, with blank lines separating
// named catalogs. Avoids pulling a YAML lib into a root-only script.
function readCatalogs() {
  const yaml = fs.readFileSync(path.join(ROOT, 'pnpm-workspace.yaml'), 'utf-8');
  const lines = yaml.split('\n');
  const out = { default: new Set(), named: new Map() };

  const indentOf = (l) => l.match(/^( *)/)[1].length;
  const entryKey = (l) => {
    const m = l.match(/^\s+'?([^'":\s]+)'?\s*:/);
    return m ? m[1] : null;
  };

  let mode = null; // 'default' | 'catalogs' | null
  let currentNamed = null;
  for (const line of lines) {
    const trimmed = line.trim();
    // Blank lines and comment-only lines are visual separators; preserve
    // current mode and currentNamed so sub-cohort grouping inside a named
    // catalog is allowed (with `# comment` headers and blank-line gaps).
    if (trimmed === '' || trimmed.startsWith('#')) continue;
    if (/^\S/.test(line)) {
      if (/^catalog:\s*$/.test(line)) {
        mode = 'default';
        currentNamed = null;
      } else if (/^catalogs:\s*$/.test(line)) {
        mode = 'catalogs';
        currentNamed = null;
      } else {
        mode = null;
        currentNamed = null;
      }
      continue;
    }
    const ind = indentOf(line);
    if (mode === 'default' && ind === 2) {
      const k = entryKey(line);
      if (k) out.default.add(k);
    } else if (mode === 'catalogs') {
      if (ind === 2) {
        currentNamed = line.trim().replace(/:$/, '');
        if (!out.named.has(currentNamed)) {
          out.named.set(currentNamed, new Set());
        }
      } else if (ind >= 4 && currentNamed) {
        const k = entryKey(line);
        if (k) out.named.get(currentNamed).add(k);
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
for (const [name, keys] of catalogs.named) {
  if (name === 'peer') continue; // peer applies to peerDeps, handled below
  enforceCatalog(keys, installUsage, `catalog:${name}`, `${name} catalog`);
}
enforceCatalog(peerCatalogKeys, peerUsage, 'catalog:peer', 'peer catalog');

// Drift detection: an uncataloged dep used at multiple distinct specs across
// workspaces is drift. Cataloged deps are skipped — their consistency is
// already enforced by enforceCatalog above. Install and peer are scanned
// separately because their cataloged keysets differ (install pins vs peer
// compatibility ranges).
const installCatalogedKeys = new Set([
  ...defaultCatalogKeys,
  ...[...catalogs.named.entries()]
    .filter(([n]) => n !== 'peer')
    .flatMap(([, s]) => [...s]),
]);

function detectDrift(usage, catalogedKeys, scope) {
  for (const [name, bySpec] of usage) {
    if (catalogedKeys.has(name)) continue;
    if (bySpec.size <= 1) continue;
    const lines = [];
    for (const [spec, labels] of bySpec) {
      for (const label of labels) {
        lines.push(`    ${JSON.stringify(spec)} — ${label}`);
      }
    }
    errors.push(
      `[${scope} drift] "${name}" is used at ${
        bySpec.size
      } different versions across workspaces; add it to a catalog in pnpm-workspace.yaml\n${lines.join(
        '\n'
      )}`
    );
  }
}

detectDrift(installUsage, installCatalogedKeys, 'install');
detectDrift(peerUsage, peerCatalogKeys, 'peer');

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
