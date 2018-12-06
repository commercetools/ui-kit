import React from 'react';
import { FlatButton, InformationIcon } from '../../../../dist/ui-kit.esm';
import { Cases, Case, screenshot } from '../../../../test/percy';

screenshot('FlatButton', () => (
  <Cases>
    <Case label="regular">
      <FlatButton type="primary" label="A label text" onClick={() => {}} />
    </Case>
    <Case label="disabled">
      <FlatButton
        type="primary"
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Case>
    <Case label="with icon left (default)">
      <FlatButton
        type="primary"
        label="A label text"
        onClick={() => {}}
        icon={<InformationIcon />}
      />
    </Case>
    <Case label="with icon right">
      <FlatButton
        type="primary"
        label="A label text"
        onClick={() => {}}
        icon={<InformationIcon />}
        iconPosition="right"
      />
    </Case>
    <Case label="secondary">
      <FlatButton
        type="secondary"
        label="A label text"
        onClick={() => {}}
        icon={<InformationIcon />}
      />
    </Case>
  </Cases>
));
