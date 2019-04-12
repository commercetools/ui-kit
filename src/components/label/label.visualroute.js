import React from 'react';
import { Label } from 'ui-kit';
import { ThemeProvider } from 'emotion-theming';
import { Suite, Spec } from '../../../test/percy';

export const routePath = '/label';

export const component = ({ themes }) => (
  <Suite>
    <Spec label="minimal">
      <Label>Hello</Label>
    </Spec>
    <Spec label="when bold">
      <Label isBold={true}>Hello</Label>
    </Spec>
    <Spec label="with required indicator">
      <Label isBold={true} isRequiredIndicatorVisible={true}>
        Hello
      </Label>
    </Spec>
    <ThemeProvider theme={{ ...themes.darkTheme, colorSurface: 'purple' }}>
      <Spec label="when inverted" omitPropsList={true}>
        <ThemeProvider theme={themes.darkTheme}>
          <Label tone="inverted">Hello</Label>
        </ThemeProvider>
      </Spec>
    </ThemeProvider>
  </Suite>
);
