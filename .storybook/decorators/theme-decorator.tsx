import type { Decorator } from '@storybook/react';
import { ThemeProvider } from '../../design-system';

const withThemeDecorator: Decorator = (Story) => (
  <div>
    <ThemeProvider theme="default" />
    <Story />
  </div>
);

export default withThemeDecorator;
