import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

// https://storybook.js.org/docs/react/configure/features-and-behavior
addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'right',
  sidebarAnimations: true,
  enableShortcuts: true,
  isToolshown: true,
  theme: create({
    base: 'light',
    brandTitle: 'UI Kit',
    brandUrl: 'https://uikit.commercetools.com',
    // To control appearance:
    brandImage:
      'https://unpkg.com/@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_RGB.png',
  }),
  selectedPanel: undefined,
  initialActive: 'sidebar',
  showRoots: false,
});
