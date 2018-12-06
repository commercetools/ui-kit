import React from 'react';
import { InformationIcon, SecondaryButton } from '../../../../dist/ui-kit.esm';
import { Cases, Case, screenshot } from '../../../../test/percy';

screenshot('SecondaryButton', () => (
  <Cases>
    <Case label="regular">
      <SecondaryButton label="A label text" onClick={() => {}} />
    </Case>

    <Case label="disabled">
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Case>

    <Case label="with icon left (default)">
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        iconLeft={<InformationIcon />}
      />
    </Case>

    <Case label="as toggle button - when not toggled">
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    </Case>

    <Case label="as toggle button - when toggled">
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
      />
    </Case>

    <Case label='with theme - when toggled with theme "default"'>
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
        theme="default"
      />
    </Case>
    <Case label='with theme - when toggled with theme "blue"'>
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
        theme="blue"
      />
    </Case>
    <Case label='with theme - when not toggled with theme "default"'>
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={false}
        theme="default"
      />
    </Case>
    <Case label='with theme - when not toggled with theme "blue"'>
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={false}
        theme="blue"
      />
    </Case>

    <Case label='size - when "big"'>
      <SecondaryButton label="A label text" onClick={() => {}} size="big" />
    </Case>

    <Case label='size - when "small"'>
      <SecondaryButton label="A label text" onClick={() => {}} size="small" />
    </Case>

    <Case label='tone - when "urgent"'>
      <SecondaryButton label="A label text" onClick={() => {}} size="urgent" />
    </Case>

    <Case label='tone - when "primary"'>
      <SecondaryButton label="A label text" onClick={() => {}} size="primary" />
    </Case>

    <Case label="when used as link">
      <SecondaryButton label="A label text" linkTo="/" />
    </Case>
  </Cases>
));
