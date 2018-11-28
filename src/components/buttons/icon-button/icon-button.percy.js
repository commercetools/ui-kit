import React from 'react';
import IconButton from './icon-button';
import { InformationIcon } from '../../icons';

suite('IconButton', () => {
  percySnapshot('regular', () => (
    <IconButton
      icon={<InformationIcon />}
      label="A label text"
      onClick={() => {}}
    />
  ));

  percySnapshot('disabled', () => (
    <IconButton
      icon={<InformationIcon />}
      label="A label text"
      onClick={() => {}}
      isDisabled={true}
    />
  ));

  suite('as toggle button', () => {
    percySnapshot('when toggled', () => (
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
      />
    ));

    percySnapshot('when not toggled', () => (
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    ));
  });

  suite('shapes', () => {
    percySnapshot('when round (default)', () => (
      <IconButton
        icon={<InformationIcon />}
        shape="round"
        label="A label text"
        onClick={() => {}}
      />
    ));

    percySnapshot('when square', () => (
      <IconButton
        icon={<InformationIcon />}
        shape="square"
        label="A label text"
        onClick={() => {}}
      />
    ));
  });

  suite('sizes', () => {
    suite('when round', () => {
      percySnapshot('when small', () => (
        <IconButton
          icon={<InformationIcon />}
          size="small"
          label="A label text"
          onClick={() => {}}
        />
      ));

      percySnapshot('when medium', () => (
        <IconButton
          icon={<InformationIcon />}
          size="medium"
          label="A label text"
          onClick={() => {}}
        />
      ));

      percySnapshot('when big (default)', () => (
        <IconButton
          icon={<InformationIcon />}
          size="big"
          label="A label text"
          onClick={() => {}}
        />
      ));
    });

    suite('when square', () => {
      percySnapshot('when small', () => (
        <IconButton
          icon={<InformationIcon />}
          shape="square"
          size="small"
          label="A label text"
          onClick={() => {}}
        />
      ));

      percySnapshot('when medium', () => (
        <IconButton
          icon={<InformationIcon />}
          shape="square"
          size="medium"
          label="A label text"
          onClick={() => {}}
        />
      ));

      percySnapshot('when big (default)', () => (
        <IconButton
          icon={<InformationIcon />}
          shape="square"
          size="big"
          label="A label text"
          onClick={() => {}}
        />
      ));
    });
  });

  suite('theme', () => {
    percySnapshot('when default', () => (
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        theme="default"
      />
    ));

    percySnapshot('when green', () => (
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        theme="green"
      />
    ));

    percySnapshot('when blue', () => (
      <IconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        theme="blue"
      />
    ));
  });
});
