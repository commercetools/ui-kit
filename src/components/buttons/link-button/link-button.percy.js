import React from 'react';
import LinkButton from './link-button';
import { InformationIcon } from '../../icons';

suite('LinkButton', () => {
  percySnapshot('regular', () => <LinkButton label="A label text" to="/" />);

  percySnapshot('disabled', () => (
    <LinkButton label="A label text" to="/" isDisabled={true} />
  ));

  percySnapshot('with icon left', () => (
    <LinkButton label="A label text" to="/" icon={<InformationIcon />} />
  ));

  percySnapshot('with icon left and disabled', () => (
    <LinkButton
      label="A label text"
      to="/"
      isDisabled={true}
      icon={<InformationIcon />}
    />
  ));
});
