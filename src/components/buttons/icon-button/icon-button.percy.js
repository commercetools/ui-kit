import React from 'react';
import { IconButton, InformationIcon } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

screenshot('IconButton', () => (
  <Suite>
    <Spec label="regular">
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
      />
    </Spec>

    <Spec label="disabled">
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Spec>

    <Spec label="when toggled">
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
      />
    </Spec>

    <Spec label="when not toggled">
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    </Spec>
    <Spec label="shapes - when round (default)">
      <IconButton
        icon={<InformationIcon />}
        shape="round"
        label="A label text"
        onClick={() => {}}
      />
    </Spec>

    <Spec label="shapes - when square">
      <IconButton
        icon={<InformationIcon />}
        shape="square"
        label="A label text"
        onClick={() => {}}
      />
    </Spec>
    <Spec label="sizes - when round - when small">
      <IconButton
        icon={<InformationIcon />}
        size="small"
        label="A label text"
        onClick={() => {}}
      />
    </Spec>

    <Spec label="sizes - when round - when medium">
      <IconButton
        icon={<InformationIcon />}
        size="medium"
        label="A label text"
        onClick={() => {}}
      />
    </Spec>

    <Spec label="sizes - when round - when big (default)">
      <IconButton
        icon={<InformationIcon />}
        size="big"
        label="A label text"
        onClick={() => {}}
      />
    </Spec>
    <Spec label="sizes - when square - when small">
      <IconButton
        icon={<InformationIcon />}
        shape="square"
        size="small"
        label="A label text"
        onClick={() => {}}
      />
    </Spec>

    <Spec label="sizes - when square - when medium">
      <IconButton
        icon={<InformationIcon />}
        shape="square"
        size="medium"
        label="A label text"
        onClick={() => {}}
      />
    </Spec>

    <Spec label="sizes - when square - when big (default)">
      <IconButton
        icon={<InformationIcon />}
        shape="square"
        size="big"
        label="A label text"
        onClick={() => {}}
      />
    </Spec>
    <Spec label="theme - when default">
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        theme="default"
      />
    </Spec>

    <Spec label="theme - when green">
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        theme="green"
      />
    </Spec>

    <Spec label="theme - when blue">
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        theme="blue"
      />
    </Spec>

    <Spec label="type - when button">
      <IconButton
        icon={<InformationIcon />}
        type="button"
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    </Spec>

    <Spec label="type - when submit">
      <IconButton
        icon={<InformationIcon />}
        type="submit"
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    </Spec>

    <Spec label="type - when reset">
      <IconButton
        icon={<InformationIcon />}
        type="reset"
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    </Spec>
  </Suite>
));
