import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BoxIcon, BrainIcon, FlameIcon } from '@commercetools-uikit/icons';
import { categorize } from '@/storybook-helpers';
import PrimaryActionDropdown from './primary-action-dropdown';
import Option from './option';

const BASE_CATEGORY = 'Option';

type PrimaryActionDropdownPropsAndCustomArgs = ComponentProps<
  typeof PrimaryActionDropdown
> & {
  isDisabledOption1: boolean;
  isDisabledOption2: boolean;
  isDisabledOption3: boolean;
  labelOption1: string;
  labelOption2: string;
  labelOption3: string;
};

const meta = {
  title: 'Components/PrimaryActionDropdown',
  component: PrimaryActionDropdown,
  parameters: {
    docs: {
      story: {
        height: '280px',
      },
    },
  },
  argTypes: {
    isDisabledOption1: categorize(BASE_CATEGORY, 1),
    isDisabledOption2: categorize(BASE_CATEGORY, 2),
    isDisabledOption3: categorize(BASE_CATEGORY, 3),
    labelOption1: categorize(BASE_CATEGORY, 1),
    labelOption2: categorize(BASE_CATEGORY, 2),
    labelOption3: categorize(BASE_CATEGORY, 3),
  },
} satisfies Meta<PrimaryActionDropdownPropsAndCustomArgs>;

export default meta;
type Story = StoryObj<PrimaryActionDropdownPropsAndCustomArgs>;

export const Default: Story = {
  args: {
    isDisabledOption1: false,
    isDisabledOption2: false,
    isDisabledOption3: false,
    labelOption1: 'Option 1',
    labelOption2: 'Option 2',
    labelOption3: 'Option 3',
  },

  render: (args) => {
    return (
      <PrimaryActionDropdown>
        <Option
          iconLeft={<BoxIcon />}
          isDisabled={args.isDisabledOption1}
          onClick={() => {}}
        >
          {args.labelOption1}
        </Option>
        <Option
          iconLeft={<BrainIcon />}
          isDisabled={args.isDisabledOption2}
          onClick={() => {}}
        >
          {args.labelOption2}
        </Option>
        <Option
          iconLeft={<FlameIcon />}
          isDisabled={args.isDisabledOption3}
          onClick={() => {}}
        >
          {args.labelOption3}
        </Option>
      </PrimaryActionDropdown>
    );
  },
};
