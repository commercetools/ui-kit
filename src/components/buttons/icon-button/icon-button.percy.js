import React from 'react';
import { IconButton, InformationIcon } from '../../../../dist/ui-kit.esm';
import { Cases, Case, screenshot } from '../../../../test/percy';

screenshot('IconButton', () => (
  <Cases>
    <Case label="regular">
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
      />
    </Case>

    <Case label="disabled">
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Case>

    <Case label="when toggled">
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
      />
    </Case>

    <Case label="when not toggled">
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    </Case>
    <Case label="shapes - when round (default)">
      <IconButton
        icon={<InformationIcon />}
        shape="round"
        label="A label text"
        onClick={() => {}}
      />
    </Case>

    <Case label="shapes - when square">
      <IconButton
        icon={<InformationIcon />}
        shape="square"
        label="A label text"
        onClick={() => {}}
      />
    </Case>
    <Case label="sizes - when round - when small">
      <IconButton
        icon={<InformationIcon />}
        size="small"
        label="A label text"
        onClick={() => {}}
      />
    </Case>

    <Case label="sizes - when round - when medium">
      <IconButton
        icon={<InformationIcon />}
        size="medium"
        label="A label text"
        onClick={() => {}}
      />
    </Case>

    <Case label="sizes - when round - when big (default)">
      <IconButton
        icon={<InformationIcon />}
        size="big"
        label="A label text"
        onClick={() => {}}
      />
    </Case>
    <Case label="sizes - when square - when small">
      <IconButton
        icon={<InformationIcon />}
        shape="square"
        size="small"
        label="A label text"
        onClick={() => {}}
      />
    </Case>

    <Case label="sizes - when square - when medium">
      <IconButton
        icon={<InformationIcon />}
        shape="square"
        size="medium"
        label="A label text"
        onClick={() => {}}
      />
    </Case>

    <Case label="sizes - when square - when big (default)">
      <IconButton
        icon={<InformationIcon />}
        shape="square"
        size="big"
        label="A label text"
        onClick={() => {}}
      />
    </Case>
    <Case label="theme - when default">
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        theme="default"
      />
    </Case>

    <Case label="theme - when green">
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        theme="green"
      />
    </Case>

    <Case label="theme - when blue">
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        theme="blue"
      />
    </Case>
  </Cases>
));
