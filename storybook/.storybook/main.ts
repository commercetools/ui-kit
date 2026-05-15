import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react-swc';
import ViteYaml from '@modyfi/vite-plugin-yaml';
import remarkGfm from 'remark-gfm';
import { join, dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import { prepareManagerHeadFile } from './../scripts/prepare-manager-head-file';

const isProduction = process.env.NODE_ENV === 'production';
const prodHead = readFileSync(
  join(__dirname, './manager-head.prod.html'),
  'utf8'
);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    '../src/docs/**/**.mdx',
    // Anchored to `src/` literal segment so the glob can't traverse into
    // strict-pnpm's nested <pkg>/node_modules/@commercetools-uikit/* symlinks
    // and re-discover the same stories under a different path.
    '../../packages/components/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../packages/components/*/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../packages/components/*/src/**/*.mdx',
    '../../packages/components/*/*/src/**/*.mdx',
  ],
  // head = the manager-header.html file contents
  managerHead: (head) => `
    ${head}
    ${isProduction ? prepareManagerHeadFile(prodHead) : ''}
  `,
  addons: [
    //getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    {
      name: getAbsolutePath('@storybook/addon-docs'),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {
    defaultName: 'Props',
  },

  core: {
    disableTelemetry: true,
  },

  staticDirs: ['../src/static'],

  viteFinal: async (config, _options) => {
    config.resolve = config.resolve || {};

    // Our custom alias for better import statements
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/storybook-helpers': resolve(__dirname, './../src/helpers'),
    };

    config.plugins?.push(
      react({
        jsxImportSource: '@emotion/react',
        plugins: [['@swc/plugin-emotion', {}]],
      })
    );

    config.plugins?.push(ViteYaml());

    return config;
  },
};

export default config;
