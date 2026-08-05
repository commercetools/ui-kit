import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClockIcon } from '@commercetools-uikit/icons';
import { iconArgType, VisualSpec } from '@/storybook-helpers';
import Stamp from './stamp';

const meta: Meta<typeof Stamp> = {
  title: 'components/Stamp',
  component: Stamp,
  argTypes: {
    icon: iconArgType,
    children: { control: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Stamp>;

/** Stamps are visual labels which hold small amounts of information regarding an item.
 * (E.g Indicating if a product is published in a list). */
export const BasicExample: Story = {
  args: {
    label: 'Hello, world!',
    // @ts-ignore
    icon: 'WorldIcon',
  },
};

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="when critical">
        <Stamp tone="critical">Critical</Stamp>
      </VisualSpec>
      <VisualSpec label="when positive">
        <Stamp tone="positive">Positive</Stamp>
      </VisualSpec>
      <VisualSpec label="when warning">
        <Stamp tone="warning">Warning</Stamp>
      </VisualSpec>
      <VisualSpec label="when information">
        <Stamp tone="information">Information</Stamp>
      </VisualSpec>
      <VisualSpec label="when primary">
        <Stamp tone="primary">Primary</Stamp>
      </VisualSpec>
      <VisualSpec label="when secondary">
        <Stamp tone="secondary">Secondary</Stamp>
      </VisualSpec>
      <VisualSpec label="when condensed">
        <Stamp tone="information" isCondensed={true}>
          Secondary
        </Stamp>
      </VisualSpec>
      <VisualSpec label="when condensed with icon and label">
        <Stamp
          tone="information"
          isCondensed={true}
          label="Hello"
          icon={<ClockIcon />}
        />
      </VisualSpec>
      <VisualSpec label="when not condensed with icon and label">
        <Stamp
          tone="information"
          isCondensed={false}
          label="Hello"
          icon={<ClockIcon />}
        />
      </VisualSpec>
    </>
  ),
};
