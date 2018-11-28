import React from 'react';
import FlatButton from './flat-button';
import { InformationIcon } from '../../icons';

suite('FlatButton', () => {
  percySnapshot('regular', () => (
    <FlatButton type="primary" label="A label text" onClick={() => {}} />
  ));

  percySnapshot('disabled', () => (
    <FlatButton
      type="primary"
      label="A label text"
      onClick={() => {}}
      isDisabled={true}
    />
  ));

  percySnapshot('with icon left (default)', () => (
    <FlatButton
      type="primary"
      label="A label text"
      onClick={() => {}}
      icon={<InformationIcon />}
    />
  ));

  percySnapshot('with icon right', () => (
    <FlatButton
      type="primary"
      label="A label text"
      onClick={() => {}}
      icon={<InformationIcon />}
      iconPosition="right"
    />
  ));

  percySnapshot('secondary', () => (
    <FlatButton
      type="secondary"
      label="A label text"
      onClick={() => {}}
      icon={<InformationIcon />}
    />
  ));
});
