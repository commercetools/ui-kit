import type { ComponentProps, ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import Avatar from './avatar';
import { iconArgType, VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof Avatar> = {
  title: 'components/Avatar',
  component: Avatar,
  argTypes: {
    icon: iconArgType,
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const BasicExample: Story = {
  args: {
    firstName: 'John',
    lastName: 'Doe',
    size: 'm',
  },
};

// `gravatarHash` is required on Avatar's props, but 10 of these 17 states omit
// it and render fine. Cast here rather than change the component's type.
const AvatarSpec = Avatar as ComponentType<
  Partial<ComponentProps<typeof Avatar>>
>;

const HASH = '205e460b479e2e5b48aec07710c08d50';

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="when gravatar hash is known">
        <AvatarSpec
          gravatarHash={HASH}
          firstName="John"
          lastName="Doe"
          size="s"
        />
      </VisualSpec>
      <VisualSpec label="when gravatar hash is unknown">
        <AvatarSpec
          gravatarHash="foo"
          firstName="John"
          lastName="Doe"
          size="s"
        />
      </VisualSpec>
      <VisualSpec label={'when size is "s"'}>
        <AvatarSpec
          gravatarHash={HASH}
          firstName="John"
          lastName="Doe"
          size="s"
        />
      </VisualSpec>
      <VisualSpec label={'when size is "m"'}>
        <AvatarSpec
          gravatarHash={HASH}
          firstName="John"
          lastName="Doe"
          size="m"
        />
      </VisualSpec>
      <VisualSpec label={'when size is "l"'}>
        <AvatarSpec
          gravatarHash={HASH}
          firstName="John"
          lastName="Doe"
          size="l"
        />
      </VisualSpec>
      <VisualSpec label={'when size is "s" and name is long'}>
        <AvatarSpec firstName="John" lastName="Doe" size="s" />
      </VisualSpec>
      <VisualSpec label={'when size is "m" and name is long'}>
        <AvatarSpec firstName="John" lastName="Doe" size="m" />
      </VisualSpec>
      <VisualSpec label={'when size is "l" and name is long'}>
        <AvatarSpec firstName="John" lastName="Doe" size="l" />
      </VisualSpec>
      <VisualSpec label={'when size is "s" and name is short'}>
        <AvatarSpec firstName="John" size="s" />
      </VisualSpec>
      <VisualSpec label={'when size is "m" and name is short'}>
        <AvatarSpec firstName="John" size="m" />
      </VisualSpec>
      <VisualSpec label={'when size is "l" and name is short'}>
        <AvatarSpec firstName="John" size="l" />
      </VisualSpec>
      <VisualSpec label="when highlighted">
        <AvatarSpec
          gravatarHash={HASH}
          firstName="John"
          lastName="Doe"
          size="m"
          isHighlighted={true}
        />
      </VisualSpec>
      <VisualSpec label="when icon exists">
        <AvatarSpec
          gravatarHash={HASH}
          firstName="John"
          lastName="Doe"
          size="m"
          icon={<PlusBoldIcon />}
        />
      </VisualSpec>
      <VisualSpec label="when color is accent">
        <AvatarSpec firstName="John" lastName="Doe" size="m" color="accent" />
      </VisualSpec>
      <VisualSpec label="when color is purple">
        <AvatarSpec firstName="John" lastName="Doe" size="m" color="purple" />
      </VisualSpec>
      <VisualSpec label="when color is turquoise">
        <AvatarSpec
          firstName="John"
          lastName="Doe"
          size="m"
          color="turquoise"
        />
      </VisualSpec>
      <VisualSpec label="when color is brown">
        <AvatarSpec firstName="John" lastName="Doe" size="m" color="brown" />
      </VisualSpec>
    </>
  ),
};
