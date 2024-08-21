import type { Meta, StoryFn } from '@storybook/react';
import LeadingIcon from './leading-icon';
import { iconArgType } from '@/storybook-helpers';

const meta: Meta<typeof LeadingIcon> = {
  title: 'Text & Media/Icons/LeadingIcon',
  component: LeadingIcon,
  argTypes: {
    icon: iconArgType,
  },
};
export default meta;

type Story = StoryFn<typeof LeadingIcon>;

/**
 * The leading icon is a an eye-catching visual element that should be used when an additional visual prominence
 * is needed for a content section in the UI. The different colours in combination with the icons can be utilised
 * to create certain categorisation of the elements in the UI.
 */
export const BasicExample: Story = {
  args: {
    // @ts-ignore todo: fix (the component wants a react element, storybook wants a string)
    icon: 'AngleDownIcon',
    color: 'neutral',
    size: '20',
    isInverted: false,
  },
};
