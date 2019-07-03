import React from 'react';
import { Link } from 'ui-kit';
import { ThemeProvider } from 'emotion-theming';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/link';

const purpleTheme = {
  colorPrimary: 'purple',
  colorPrimary25: 'deeppurple',
};

export const component = () => (
  <Suite>
    <Spec label="regular">
      <Link to="/">A label text</Link>
    </Spec>
    <Spec label="external">
      <Link to="/" isExternal={true}>
        A label text
      </Link>
    </Spec>
    <Spec label="without underline">
      <Link to="/" hasUnderline={false}>
        A label text
      </Link>
    </Spec>
    <ThemeProvider theme={purpleTheme}>
      <Spec label="with custom theme">
        <Link to="/">A label text</Link>
      </Spec>
    </ThemeProvider>
  </Suite>
);
