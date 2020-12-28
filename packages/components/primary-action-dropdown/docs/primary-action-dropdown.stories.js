import React from 'react';
import { action } from '@storybook/addon-actions';
import { BoxIcon, BrainIcon, FlameIcon } from '@commercetools-uikit/icons';
import PrimaryActionDropdown, { Option } from '../src';

export default {
  title: 'Components/Buttons/PrimaryActionDropdown',
  component: PrimaryActionDropdown,
  subcomponents: { Option },
  argTypes: {
    isDisabledOption1: { control: 'boolean' },
    isDisabledOption2: { control: 'boolean' },
    isDisabledOption3: { control: 'boolean' },
  },
};

const Template = (args) => (
  <PrimaryActionDropdown>
    <Option
      iconLeft={<BoxIcon />}
      isDisabled={args.isDisabledOption1}
      onClick={action('onClick option 1')}
    >
      {'Option 1: label'}
    </Option>
    <Option
      iconLeft={<BrainIcon />}
      isDisabled={args.isDisabledOption2}
      onClick={action('onClick option 2')}
    >
      {'Option 2: label'}
    </Option>
    <Option
      iconLeft={<FlameIcon />}
      isDisabled={args.isDisabledOption3}
      onClick={action('onClick option 3')}
    >
      {'Option 3: label'}
    </Option>
  </PrimaryActionDropdown>
);

export const Default = Template.bind({});
Default.args = {};
