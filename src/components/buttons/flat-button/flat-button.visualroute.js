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
    <Spec
      label="as anchor, with a multiline text and icon left"
      listPropsOfNestedChild
    >
      <div style={{ width: 150 }}>
        <FlatButton
          tone="primary"
          label="A label for an anchor which is pretty looooong and doesn't fit its container without breaking"
          onClick={() => {}}
          icon={<InformationIcon />}
          as="a"
        />
      </div>
    </Spec>
    <Spec
      label="as anchor, with a multiline text and icon right"
      listPropsOfNestedChild
    >
      <div style={{ width: 150 }}>
        <FlatButton
          tone="primary"
          label="A label for an anchor which is pretty looooong and doesn't fit its container without breaking"
          onClick={() => {}}
          icon={<InformationIcon />}
          iconPosition="right"
          as="a"
        />
      </div>
    </Spec>
  </Suite>
);
