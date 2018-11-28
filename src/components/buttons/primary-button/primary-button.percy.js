import React from 'react';
import PrimaryButton from './primary-button';
import { InformationIcon } from '../../icons';

suite('PrimaryButton', () => {
  percySnapshot('regular', () => (
    <PrimaryButton label="A label text" onClick={() => {}} />
  ));

  percySnapshot('disabled', () => (
    <PrimaryButton label="A label text" onClick={() => {}} isDisabled={true} />
  ));

  percySnapshot('with icon left (default)', () => (
    <PrimaryButton
      label="A label text"
      onClick={() => {}}
      iconLeft={<InformationIcon />}
    />
  ));

  suite('as toggle button', () => {
    percySnapshot('when not toggled', () => (
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    ));

    percySnapshot('when toggled', () => (
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
      />
    ));
  });

  suite('size', () => {
    percySnapshot('when "big"', () => (
      <PrimaryButton label="A label text" onClick={() => {}} size="big" />
    ));

    percySnapshot('when "small"', () => (
      <PrimaryButton label="A label text" onClick={() => {}} size="small" />
    ));
  });

  suite('tone', () => {
    percySnapshot('when "urgent"', () => (
      <PrimaryButton label="A label text" onClick={() => {}} tone="urgent" />
    ));

    percySnapshot('when "primary"', () => (
      <PrimaryButton label="A label text" onClick={() => {}} tone="primary" />
    ));
  });
});
