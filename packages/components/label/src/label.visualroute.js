import React from 'react';
import { Label } from '@commercetools-frontend/ui-kit';
import { ThemeProvider } from 'emotion-theming';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/label';

const intlMessage = { id: 'input-label', defaultMessage: 'Hello' };

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
      <Spec label="when inverted" listPropsOfNestedChild={true}>
        <ThemeProvider theme={themes.darkTheme}>
          <Label tone="inverted">Hello</Label>
        </ThemeProvider>
      </Spec>
    </ThemeProvider>
    <Spec label="intlMessage">
      <Label intlMessage={intlMessage} />
    </Spec>
  </Suite>
);
