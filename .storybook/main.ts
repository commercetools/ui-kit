import { dirname, join, resolve } from 'path';
import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';
import remarkGfm from 'remark-gfm';

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    '../packages/components/**/*.mdx',
    '../packages/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-links'),
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
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {
    autodocs: true,
  },
  core: {
    disableTelemetry: true,
  },
  viteFinal: async (config, _options) => {
    config.resolve = config.resolve || {};

    // Our custom alias for better import statements
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/storybook-helpers': resolve(__dirname, './helpers'),
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

    return config;
  },
};

export default config;
