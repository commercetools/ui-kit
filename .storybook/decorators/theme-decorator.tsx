import React from 'react';
import { ThemeProvider } from '../../design-system';

const withThemeDecorator = (Story) => (
  <div>
    <ThemeProvider theme="default" />
    <Story />
  </div>
);

export default withThemeDecorator;
