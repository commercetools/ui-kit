module.exports = {
  stories: [
    '../../packages/**/*.story.mdx',
    '../../packages/**/avatar.story.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  // "core": {
  //   "builder": "@storybook/builder-vite"
  // },
  // "features": {
  //   "storyStoreV7": true
  // }
};
