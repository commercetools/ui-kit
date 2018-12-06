import React from 'react';
import { InformationIcon, PrimaryButton } from '../../../../dist/ui-kit.esm';
import { Cases, Case, screenshot } from '../../../../test/percy';

screenshot('PrimaryButton', () => (
  <Cases>
    <Case label="regular">
      <PrimaryButton label="A label text" onClick={() => {}} />
    </Case>

    <Case label="disabled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Case>

    <Case label="with icon left (default)">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        iconLeft={<InformationIcon />}
      />
    </Case>

    <Case label="as toggle button - when not toggled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    </Case>

    <Case label="as toggle button - when toggled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
      />
    </Case>

    <Case label='size - when "big"'>
      <PrimaryButton label="A label text" onClick={() => {}} size="big" />
    </Case>

    <Case label='size - when "small"'>
      <PrimaryButton label="A label text" onClick={() => {}} size="small" />
    </Case>

    <Case label='tone - when "urgent"'>
      <PrimaryButton label="A label text" onClick={() => {}} tone="urgent" />
    </Case>

    <Case label='tone - when "primary"'>
      <PrimaryButton label="A label text" onClick={() => {}} tone="primary" />
    </Case>
  </Cases>
));
