import { ThemeProvider } from '../../../design-system/';
import type { Decorator } from '@storybook/react-vite';

export const withThemeDecorator: Decorator = (Story) => (
  <div>
    <ThemeProvider theme="default" />
    <Story />
  </div>
);
