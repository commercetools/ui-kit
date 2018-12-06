import React from 'react';
import { Avatar } from '../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../test/percy';

screenshot('Avatar', () => (
  <Suite>
    <Spec label="when gravatar hash is known">
      <Avatar
        gravatarHash="205e460b479e2e5b48aec07710c08d50"
        firstName="John"
        lastName="Doe"
        size="s"
      />
    </Spec>

    <Spec label="when gravatar hash is unknown">
      <Avatar gravatarHash="foo" firstName="John" lastName="Doe" size="s" />
    </Spec>

    <Spec label='when size is "s"'>
      <Avatar
        gravatarHash="205e460b479e2e5b48aec07710c08d50"
        firstName="John"
        lastName="Doe"
        size="s"
      />
    </Spec>

    <Spec label='when size is "m"'>
      <Avatar
        gravatarHash="205e460b479e2e5b48aec07710c08d50"
        firstName="John"
        lastName="Doe"
        size="m"
      />
    </Spec>

    <Spec label='when size is "l"'>
      <Avatar
        gravatarHash="205e460b479e2e5b48aec07710c08d50"
        firstName="John"
        lastName="Doe"
        size="l"
      />
    </Spec>

    <Spec label="when highlighted">
      <Avatar
        gravatarHash="205e460b479e2e5b48aec07710c08d50"
        firstName="John"
        lastName="Doe"
        size="m"
        isHighlighted={true}
      />
    </Spec>
  </Suite>
));
