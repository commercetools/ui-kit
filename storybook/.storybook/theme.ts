import { create } from '@storybook/theming/create';

export const cocoTheme = create({
  // Mode
  base: 'light',

  // Brand
  brandTitle: 'commercetools ui-kit',
  brandUrl: (() => {
    return process.env.NODE_ENV === 'production'
      ? 'https://ui-kit.commercetools.com'
      : 'http://localhost:6006';
  })(),
  brandImage:
    'https://unpkg.com/@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_RGB.png',
  brandTarget: '_self',

  // Typography
  fontBase: '"Inter", serif',
  fontCode: 'monospace',

  //
  // colorPrimary: '#3A10E5',
  // colorSecondary: '#585C6D',

  colorPrimary: 'hsl(240, 64%, 58%)',
  colorSecondary: 'hsl(195, 70%, 50%)',

  // UI
  //appBg: '#ff0000',
  //appContentBg: '#ffffff',
  //appPreviewBg: '#ffffff',
  //appBorderColor: '#585C6D',
  //appBorderRadius: 4,

  // Text colors
  textColor: '#1a1a1a',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  //barTextColor: '#9E9E9E',
  barSelectedColor: 'hsl(240, 64%, 58%)',
  barHoverColor: 'hsl(240, 64%, 40%)',
  //barBg: '#ffffff',

  // Form colors
  //inputBg: '#ffffff',
  //inputBorder: '#10162F',
  //inputTextColor: '#10162F',
  //inputBorderRadius: 2,
});
