import { ThemeProvider } from '../../../design-system/';
import type { Decorator } from '@storybook/react';

export const withThemeDecorator: Decorator = (Story) => (
  <div>
    <ThemeProvider theme="default" />
    <Story />
  </div>
);
