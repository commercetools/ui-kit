import type { Meta, StoryObj } from '@storybook/react';
import PrimaryActionDropdown, {
  Option,
  type TPrimaryActionDropdown,
} from './index';
import { PlusBoldIcon } from '@commercetools-uikit/icons';

const meta: Meta<typeof PrimaryActionDropdown> = {
  title: 'components/Dropdowns/PrimaryActionDropdown',
  component: PrimaryActionDropdown,
  subcomponents: {
    /**
     * todo: remove once sb fixed the following issue
     * @link https://github.com/storybookjs/storybook/issues/23170
     */
    // @ts-ignore
    Option,
  },
  argTypes: {
    children: { control: { disable: true } },
  },
};
export default meta;

/** Basic usage: */
type Story = StoryObj<typeof PrimaryActionDropdown>;

export const BasicExample: Story = (args: TPrimaryActionDropdown) => {
  return (
    <div style={{ height: 256 }}>
      <PrimaryActionDropdown {...args}>
        <Option iconLeft={<PlusBoldIcon />} onClick={() => {}}>
          Primary option
        </Option>
        <Option onClick={() => {}}>Another option</Option>
        <Option isDisabled={true} onClick={() => {}}>
          Even another option
        </Option>
      </PrimaryActionDropdown>
    </div>
  );
};

BasicExample.args = {};
