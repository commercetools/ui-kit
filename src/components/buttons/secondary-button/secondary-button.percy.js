import React from 'react';
import SecondaryButton from './secondary-button';
import { InformationIcon } from '../../icons';

suite('SecondaryButton', () => {
  percySnapshot('regular', () => (
    <SecondaryButton label="A label text" onClick={() => {}} />
  ));

  percySnapshot('disabled', () => (
    <SecondaryButton
      label="A label text"
      onClick={() => {}}
      isDisabled={true}
    />
  ));

  percySnapshot('with icon left (default)', () => (
    <SecondaryButton
      label="A label text"
      onClick={() => {}}
      iconLeft={<InformationIcon />}
    />
  ));

  suite('as toggle button', () => {
    percySnapshot('when not toggled', () => (
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    ));

    percySnapshot('when toggled', () => (
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
      />
    ));

    suite('with theme', () => {
      percySnapshot('when toggled with theme "default"', () => (
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
          isToggled={true}
          theme="default"
        />
      ));
      percySnapshot('when toggled with theme "blue"', () => (
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
          isToggled={true}
          theme="blue"
        />
      ));
      percySnapshot('when not toggled with theme "default"', () => (
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
          isToggled={false}
          theme="default"
        />
      ));
      percySnapshot('when not toggled with theme "blue"', () => (
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
          isToggled={false}
          theme="blue"
        />
      ));
    });
  });

  suite('size', () => {
    percySnapshot('when "big"', () => (
      <SecondaryButton label="A label text" onClick={() => {}} size="big" />
    ));

    percySnapshot('when "small"', () => (
      <SecondaryButton label="A label text" onClick={() => {}} size="small" />
    ));
  });

  suite('tone', () => {
    percySnapshot('when "urgent"', () => (
      <SecondaryButton label="A label text" onClick={() => {}} size="urgent" />
    ));

    percySnapshot('when "primary"', () => (
      <SecondaryButton label="A label text" onClick={() => {}} size="primary" />
    ));
  });

  suite('when used as link', () => {
    <SecondaryButton label="A label text" linkTo="/" />;
  });
});
