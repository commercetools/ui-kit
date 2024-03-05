// @ts-ignore
import React from 'react';
import { ThemeProvider } from '../../design-system';
import type { Decorator } from '@storybook/react';

const withThemeDecorator: Decorator = (Story) => (
  <div>
    <ThemeProvider theme="default" />
    <Story />
  </div>
);

export default withThemeDecorator;
