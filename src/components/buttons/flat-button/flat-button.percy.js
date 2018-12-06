import React from 'react';
import { FlatButton, InformationIcon } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

screenshot('FlatButton', () => (
  <Suite>
    <Spec label="regular">
      <FlatButton type="primary" label="A label text" onClick={() => {}} />
    </Spec>
    <Spec label="disabled">
      <FlatButton
        type="primary"
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Spec>
    <Spec label="with icon left (default)">
      <FlatButton
        type="primary"
        label="A label text"
        onClick={() => {}}
        icon={<InformationIcon />}
      />
    </Spec>
    <Spec label="with icon right">
      <FlatButton
        type="primary"
        label="A label text"
        onClick={() => {}}
        icon={<InformationIcon />}
        iconPosition="right"
      />
    </Spec>
    <Spec label="secondary">
      <FlatButton
        type="secondary"
        label="A label text"
        onClick={() => {}}
        icon={<InformationIcon />}
      />
    </Spec>
  </Suite>
));
