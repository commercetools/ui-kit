import type { Meta, StoryObj } from '@storybook/react';
import ViewSwitcher from './index';
import { WorldIcon } from '@commercetools-uikit/icons';

const meta: Meta<typeof ViewSwitcher.Group> = {
  title: 'components/ViewSwitcher',
  component: ViewSwitcher.Group,
  subcomponents: {
    // @ts-expect-error
    'ViewSwitcher.Button': ViewSwitcher.Button,
  },
  argTypes: {
    children: { control: false },
    defaultSelected: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof ViewSwitcher.Group>;

export const BasicExample: Story = {
  args: {
    children: ['1', '2', '3', '4'].map((v) => (
      <ViewSwitcher.Button value={v} key={v}>
        {`View ${v}`}
      </ViewSwitcher.Button>
    )),
    defaultSelected: '2',
  },
};

/** Hand over an `<Icon/>`  via the `icon` property to display an icon next to the label. */
export const ExampleWithIcons: Story = {
  args: {
    children: ['1', '2', '3', '4'].map((v) => (
      <ViewSwitcher.Button
        icon={<WorldIcon />}
        value={v}
        key={v}
      >{`View ${v}`}</ViewSwitcher.Button>
    )),
    defaultSelected: '3',
  },
};
