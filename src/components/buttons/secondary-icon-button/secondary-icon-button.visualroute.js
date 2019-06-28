import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { InformationIcon, SecondaryIconButton } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/secondary-icon-button';

export const component = ({ themes }) => (
  <Suite>
    <Spec label="regular">
      <SecondaryIconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
      />
    </Spec>
    <Spec label="disabled">
      <SecondaryIconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Spec>
    <ThemeProvider theme={themes.darkTheme}>
      <Spec label="with custom (dark) theme">
        <SecondaryIconButton
          icon={<InformationIcon />}
          label="A label text"
          onClick={() => {}}
        />
      </Spec>
    </ThemeProvider>
    <Spec label="color - solid">
      <SecondaryIconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        color="solid"
      />
    </Spec>
    <Spec label="color - primary">
      <SecondaryIconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        color="primary"
      />
    </Spec>
    <Spec label="with small Icon">
      <SecondaryIconButton
        icon={<InformationIcon size="small" />}
        label="A label text"
        onClick={() => {}}
      />
    </Spec>
  </Suite>
);
