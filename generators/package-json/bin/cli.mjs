#!/usr/bin/env node

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const result = spawnSync('pnpm', [
  'ts-node',
  '--compiler-options',
  '{"module": "commonjs"}',
  `${__dirname}/generate-package-json.ts`,
  ...process.argv.slice(2),
]);

if (result.status > 0) {
  console.error(result.stderr.toString());
  process.exit(1);
}
console.log(result.stdout.toString());
