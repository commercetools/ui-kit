/* global percySnapshot */
import React from 'react';
import FlatButton from './flat-button';

percySnapshot('Button', () => (
  <FlatButton
    type="primary"
    label="A label text"
    onClick={() => alert('Button clicked')}
    isDisabled={false}
  />
));
