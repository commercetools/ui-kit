import type { Meta, StoryObj } from '@storybook/react';
import { iconArgType } from '@/storybook-helpers';
import FieldLabel from './field-label';
import FlatButton from '@commercetools-uikit/flat-button';
import { BoxIcon } from '@commercetools-uikit/icons';

const meta: Meta<typeof FieldLabel> = {
  title: 'field/Field__/FieldLabel',
  // @ts-ignore
  component: FieldLabel,
  argTypes: {
    hintIcon: iconArgType,
    title: { control: { type: 'text' } },
    hint: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    badge: {
      control: { disable: true },
    },
  },
};
export default meta;

type Story = StoryObj<typeof FieldLabel>;

export const BasicExample: Story = {
  args: {
    horizontalConstraint: 'scale',
    title: 'Sort Order',
    hasRequiredIndicator: false,
    hint: 'Enter a number between 0 and 1',
    /** @ts-ignore */
    hintIcon: 'SortingIcon',
    description: 'This order will be used to sort the categories.',
    badge: (
      <FlatButton
        tone="primary"
        icon={<BoxIcon />}
        label="I'm used as badge"
        onClick={() => {}}
      />
    ),
  },
};
