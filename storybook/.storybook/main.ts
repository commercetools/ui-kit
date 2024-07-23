import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';
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
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../packages/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../packages/components/**/*.mdx',
  ],
  addons: [
    //getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
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
  /* swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }), */

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

    // This is required in order to use the emotion babel plugin
    // to avoid errors when using emotion component selectors
    // https://styled-components.com/docs/advanced#referring-to-other-components
    // We need to remove the default react babel plugin and add it back with the emotion plugin
    config.plugins = config.plugins?.filter(
      (plugin) =>
        // @ts-ignore
        !(Array.isArray(plugin) && plugin[0]?.name.includes('vite:react-babel'))
    );
    config.plugins?.push(
      react({
        exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      })
    );

    config.plugins?.push(ViteYaml());

    // todo: Figure out why adding this, fixes issues with all react-select dependent components
    config.optimizeDeps = {
      ...config.optimizeDeps,
      exclude: ['@commercetools-uikit/icons'],
    };

    return config;
  },
};

export default config;
