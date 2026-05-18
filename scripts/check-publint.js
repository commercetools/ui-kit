#!/usr/bin/env node
/**
 * Runs publint on every non-private workspace package. Fails CI if any
 * package fails publint (non-zero exit).
 *
 * Background: FEC-924's risk #4 — shamefully-hoist=true (which this PR
 * ships) can hide phantom dependencies on publishable packages. publint
 * lints the packed tarball and flags imports of undeclared packages.
 *
 * Defaults are deliberate:
 *   - publint exits non-zero only on Errors. Warnings/Suggestions are
 *     logged but don't fail the gate. That matches the policy we want —
 *     today every package already emits 4 suggestions + 1 warning about
 *     pkg.exports / pkg.type / engines.node / .mjs handling that are
 *     out of scope for this migration. New *errors* (phantom-dep imports,
 *     unpublished files referenced from main/module, etc.) fail the gate.
 *   - `--pack pnpm` packs first, then lints — i.e. we lint exactly what
 *     `pnpm publish` would produce, not the working-tree shape.
 *
 * Prerequisite: `pnpm build` must have run so dist/ contains real
 * artifacts (not preconstruct dev-mode symlinks, which would cause
 * pnpm pack to omit dist/*.esm.js and trigger spurious errors).
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const workspaces = JSON.parse(
  execSync('pnpm ls --json -r --depth -1', { cwd: ROOT, encoding: 'utf-8' })
);

const failures = [];
for (const ws of workspaces) {
  if (!ws.path) continue;
  const pkgJson = path.join(ws.path, 'package.json');
  if (!fs.existsSync(pkgJson)) continue;
  const pkg = JSON.parse(fs.readFileSync(pkgJson, 'utf-8'));
  if (pkg.private || !pkg.name) continue;
  try {
    execSync('pnpm exec publint --pack pnpm', {
      cwd: ws.path,
      stdio: 'inherit',
    });
  } catch (_) {
    failures.push(pkg.name);
  }
}

if (failures.length > 0) {
  console.error(`\npublint failed for ${failures.length} package(s):`);
  failures.forEach((n) => console.error(`  - ${n}`));
  process.exit(1);
}
