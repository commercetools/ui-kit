module.exports = {
  stories: [
    './pages/*.stories.mdx',
    '../packages/**/docs/*.stories.mdx',
    '../packages/**/docs/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
};
