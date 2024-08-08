import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react-swc';
import ViteYaml from '@modyfi/vite-plugin-yaml';
import remarkGfm from 'remark-gfm';
import { join, dirname, resolve } from 'path';

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
    '../../packages/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../packages/components/**/*.mdx',
  ],
  addons: [
    //getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-storysource'),
    {
      name: '@storybook/addon-docs',
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
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
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
