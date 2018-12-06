import React from 'react';
import { InformationIcon, SecondaryButton } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

screenshot('SecondaryButton', () => (
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

    <Spec label='size - when "big"'>
      <SecondaryButton label="A label text" onClick={() => {}} size="big" />
    </Spec>

    <Spec label='size - when "small"'>
      <SecondaryButton label="A label text" onClick={() => {}} size="small" />
    </Spec>

    <Spec label='tone - when "urgent"'>
      <SecondaryButton label="A label text" onClick={() => {}} size="urgent" />
    </Spec>

    <Spec label='tone - when "primary"'>
      <SecondaryButton label="A label text" onClick={() => {}} size="primary" />
    </Spec>

    <Spec label="when used as link">
      <SecondaryButton label="A label text" linkTo="/" />
    </Spec>
  </Suite>
));
