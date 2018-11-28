import React from 'react';
import Avatar from './avatar';

suite('Avatar', () => {
  percySnapshot('when gravatar hash is known', () => (
    <Avatar
      gravatarHash="205e460b479e2e5b48aec07710c08d50"
      firstName="John"
      lastName="Doe"
      size="s"
    />
  ));

  percySnapshot('when gravatar hash is unknown', () => (
    <Avatar gravatarHash="foo" firstName="John" lastName="Doe" size="s" />
  ));

  percySnapshot('when size is "s"', () => (
    <Avatar
      gravatarHash="205e460b479e2e5b48aec07710c08d50"
      firstName="John"
      lastName="Doe"
      size="s"
    />
  ));

  percySnapshot('when size is "m"', () => (
    <Avatar
      gravatarHash="205e460b479e2e5b48aec07710c08d50"
      firstName="John"
      lastName="Doe"
      size="m"
    />
  ));

  percySnapshot('when size is "l"', () => (
    <Avatar
      gravatarHash="205e460b479e2e5b48aec07710c08d50"
      firstName="John"
      lastName="Doe"
      size="l"
    />
  ));

  percySnapshot('when highlighted', () => (
    <Avatar
      gravatarHash="205e460b479e2e5b48aec07710c08d50"
      firstName="John"
      lastName="Doe"
      size="m"
      isHighlighted={true}
    />
  ));
});
