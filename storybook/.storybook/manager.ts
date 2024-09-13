import { addons } from '@storybook/manager-api';
import { cocoTheme } from './theme';

addons.setConfig({
  theme: cocoTheme,
  sidebar: {
    filters: {
      // if the item is tagged with local-dev-only, don't show it in the sidebar in production
      // see: https://github.com/storybookjs/storybook/issues/9209#issuecomment-1866309500
      // this cannot be done with `!dev` tag because the Storybook.Meta tag array will only take string literals
      // see: https://github.com/storybookjs/storybook/discussions/24192
      patterns: (item) => {
        if (process.env.NODE_ENV === 'production') {
          return !item.tags?.includes('local-dev');
        }
        return true;
      },
    },
  },
});
