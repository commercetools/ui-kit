import os from 'os';
import path from 'path';
import shelljs from 'shelljs';
import { GeneratorPackageJsonOptions } from '../src/types';
import { transformDocument } from '../src';

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
      Object {
        "bugs": "https://github.com/commercetools/ui-kit/issues",
        "description": "Render an Avenger",
        "homepage": "https://uikit.commercetools.com",
        "keywords": Array [
          "javascript",
          "design system",
          "react",
          "uikit",
        ],
        "license": "MIT",
        "main": "dist/avenger.cjs.js",
        "module": "dist/avenger.esm.js",
        "name": "@commercetools-uikit/avenger",
        "peerDependencies": Object {
          "react": "16.8.x",
        },
        "publishConfig": Object {
          "access": "public",
        },
        "readme": Object {
          "componentPaths": Array [
            "./src/avenger.js",
          ],
        },
        "repository": Object {
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
