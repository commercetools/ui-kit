import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { FlatButton, InformationIcon } from 'ui-kit';
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
        <FlatButton
          tone="inverted"
          label="A label text"
          onClick={() => {}}
          icon={<InformationIcon />}
        />
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
