import React from 'react';
import { InformationIcon, PrimaryButton } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/primary-button';

export const component = () => (
  <Suite>
    <Spec label="regular">
      <PrimaryButton label="A label text" onClick={() => {}} />
    </Spec>

    <Spec label="disabled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Spec>

    <Spec label="with icon left (default)">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        iconLeft={<InformationIcon />}
      />
    </Spec>

    <Spec label="as toggle button - when not toggled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    </Spec>

    <Spec label="as toggle button - when toggled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
      />
    </Spec>

    <Spec label='size - when "big"'>
      <PrimaryButton label="A label text" onClick={() => {}} size="big" />
    </Spec>

    <Spec label='size - when "small"'>
      <PrimaryButton label="A label text" onClick={() => {}} size="small" />
    </Spec>

    <Spec label='tone - when "urgent"'>
      <PrimaryButton label="A label text" onClick={() => {}} tone="urgent" />
    </Spec>

    <Spec label='tone - when "primary"'>
      <PrimaryButton label="A label text" onClick={() => {}} tone="primary" />
    </Spec>

    <Spec label="as toggle button - when toggled and disabled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
        isDisabled={true}
      />
    </Spec>

    <Spec label="as toggle button (urgent theme) - when not toggled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        theme="urgent"
        isToggleButton={true}
      />
    </Spec>

    <Spec label="as toggle button (urgent theme) - when toggled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        theme="urgent"
        isToggleButton={true}
        isToggled={true}
      />
    </Spec>

    <Spec label="as toggle button (urgent theme) - when toggled and disabled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        theme="urgent"
        isToggleButton={true}
        isToggled={true}
        isDisabled={true}
      />
    </Spec>
  </Suite>
);
