import React from 'react';
import { InformationIcon, SecondaryButton } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/secondary-button';

export const component = () => (
  <Suite>
    <Spec label="regular">
      <SecondaryButton label="A label text" onClick={() => {}} />
    </Spec>

    <Spec label="disabled">
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Spec>

    <Spec label="with icon left (default)">
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        iconLeft={<InformationIcon />}
      />
    </Spec>

    <Spec label="as toggle button - when not toggled">
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    </Spec>

    <Spec label="as toggle button - when toggled">
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
      />
    </Spec>

    <Spec label='with theme - when toggled with theme "default"'>
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
        theme="default"
      />
    </Spec>
    <Spec label='with theme - when toggled with theme "blue"'>
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
        theme="blue"
      />
    </Spec>
    <Spec label='with theme - when not toggled with theme "default"'>
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={false}
        theme="default"
      />
    </Spec>
    <Spec label='with theme - when not toggled with theme "blue"'>
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={false}
        theme="blue"
      />
    </Spec>

    <Spec label="when used as link">
      <SecondaryButton label="A label text" linkTo="/" />
    </Spec>
  </Suite>
);
