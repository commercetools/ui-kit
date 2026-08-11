import os from 'os';
import path from 'path';
import shelljs from 'shelljs';
import { GeneratorPackageJsonOptions } from '../src/types';
import { transformDocument } from '../src';

// `@manypkg/find-root` and `@manypkg/get-packages` are pure ESM (since their
// respective v3 majors), which Jest's CJS module runtime can't `require()`
// directly (unlike Node's native `require()`, which supports it since
// Node 22.12). Neither function is exercised by these tests (only
// `transformDocument` is), so stub them out to avoid a module-load-time
// `SyntaxError: Cannot use import statement outside a module`.
jest.mock('@manypkg/find-root', () => ({
  findRootSync: jest.fn(),
}));
jest.mock('@manypkg/get-packages', () => ({
  getPackagesSync: jest.fn(),
}));

const tmpFolder = os.tmpdir();
const testPackages = path.join(tmpFolder, 'packages');

const createTestOptions = (): GeneratorPackageJsonOptions => ({
  workspaceRoot: tmpFolder,
  dryRun: false,
});

beforeAll(() => {
  shelljs.mkdir('-p', testPackages);
  shelljs.cp('-R', path.join(__dirname, 'fixtures/avenger'), testPackages);
  shelljs.cp(
    '-R',
    path.join(__dirname, 'fixtures/justice-league'),
    testPackages
  );
});

describe('when package.json is private', () => {
  it('should not generate package.json', async () => {
    const options = createTestOptions();
    const content = await transformDocument(
      path.join(testPackages, 'justice-league'),
      options
    );
    expect(content).not.toBeDefined();
  });
});
describe('when package.json is NOT private', () => {
  it('should generate package.json with pre-defined values', async () => {
    const options = createTestOptions();
    const content = await transformDocument(
      path.join(testPackages, 'avenger'),
      options
    );
    expect(content).toMatchInlineSnapshot(`
      {
        "bugs": "https://github.com/commercetools/ui-kit/issues",
        "description": "Render an Avenger",
        "homepage": "https://uikit.commercetools.com",
        "keywords": [
          "javascript",
          "typescript",
          "design-system",
          "react",
          "uikit",
        ],
        "license": "MIT",
        "main": "dist/avenger.cjs.js",
        "module": "dist/avenger.esm.js",
        "name": "@commercetools-uikit/avenger",
        "peerDependencies": {
          "react": "16.8.x",
        },
        "publishConfig": {
          "access": "public",
        },
        "readme": {
          "componentPaths": [
            "./src/avenger.js",
          ],
        },
        "repository": {
          "directory": "packages/avenger",
          "type": "git",
          "url": "https://github.com/commercetools/ui-kit.git",
        },
        "sideEffects": false,
        "version": "1.0.0",
      }
    `);
  });
});
