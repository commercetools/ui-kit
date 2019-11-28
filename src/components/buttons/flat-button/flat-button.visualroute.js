import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { FlatButton, InformationIcon } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/flat-button';

export const component = ({ themes }) => (
  <Suite>
    <Spec label="regular">
      <FlatButton tone="primary" label="A label text" onClick={() => {}} />
    </Spec>
    <Spec label="disabled">
      <FlatButton
        tone="primary"
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Spec>
    <Spec label="with icon left (default)">
      <FlatButton
        tone="primary"
        label="A label text"
        onClick={() => {}}
        icon={<InformationIcon />}
      />
    </Spec>
    <Spec label="with icon right">
      <FlatButton
        tone="primary"
        label="A label text"
        onClick={() => {}}
        icon={<InformationIcon />}
        iconPosition="right"
      />
    </Spec>
    <Spec label="secondary">
      <FlatButton
        tone="secondary"
        label="A label text"
        onClick={() => {}}
        icon={<InformationIcon />}
      />
    </Spec>
    <ThemeProvider theme={themes.darkTheme}>
      <Spec label="inverted" listPropsOfNestedChild>
        <ThemeProvider theme={vars}>
          <FlatButton
            tone="inverted"
            label="A label text"
            onClick={() => {}}
            icon={<InformationIcon />}
          />
        </ThemeProvider>
      </Spec>
      <Spec label="secondary in dark theme">
        <FlatButton
          tone="secondary"
          label="A label text"
          onClick={() => {}}
          icon={<InformationIcon />}
        />
      </Spec>
    </ThemeProvider>
  </Suite>
);
