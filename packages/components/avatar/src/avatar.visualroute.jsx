import { Avatar, PlusBoldIcon } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/avatar';

export const component = () => (
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
    <Spec label="when icon exists">
      <Avatar
        gravatarHash="205e460b479e2e5b48aec07710c08d50"
        firstName="John"
        lastName="Doe"
        size="m"
        icon={<PlusBoldIcon />}
      />
    </Spec>
    <Spec label="when color is accent">
      <Avatar
        gravatarHash="205e460b479e2e5b48aec07710c08d50"
        firstName="John"
        lastName="Doe"
        size="m"
        color="accent"
      />
    </Spec>
    <Spec label="when color is purple">
      <Avatar
        gravatarHash="205e460b479e2e5b48aec07710c08d50"
        firstName="John"
        lastName="Doe"
        size="m"
        color="purple"
      />
    </Spec>
    <Spec label="when color is turquoise">
      <Avatar
        gravatarHash="205e460b479e2e5b48aec07710c08d50"
        firstName="John"
        lastName="Doe"
        size="m"
        color="turquoise"
      />
    </Spec>
    <Spec label="when color is brown">
      <Avatar
        gravatarHash="205e460b479e2e5b48aec07710c08d50"
        firstName="John"
        lastName="Doe"
        size="m"
        color="brown"
      />
    </Spec>
  </Suite>
);
