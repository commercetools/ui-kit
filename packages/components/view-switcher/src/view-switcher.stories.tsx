import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ViewSwitcher from '.';
import type { TViewSwitcherButtonProps } from './view-switcher-button';
import { iconArgType } from '@/storybook-helpers';

const BUTTONS_COUNT = 4;
const DEFAULT_BUTTON_ICON = 'WorldIcon';

type ViewSwitcherPropsAndCustomArgs = ComponentProps<
  typeof ViewSwitcher.Group
> & {
  iconViewSwitcherButton1: string;
  iconViewSwitcherButton2: string;
  iconViewSwitcherButton3: string;
  iconViewSwitcherButton4: string;
  iconOnlyButton1: boolean;
  iconOnlyButton2: boolean;
  iconOnlyButton3: boolean;
  iconOnlyButton4: boolean;
  isDisabledButton1: boolean;
  isDisabledButton2: boolean;
  isDisabledButton3: boolean;
  isDisabledButton4: boolean;
};

const meta = {
  title: 'Components/ViewSwitcher',
  component: ViewSwitcher.Group,
  tags: ['autodocs'],
} satisfies Meta<ViewSwitcherPropsAndCustomArgs>;

export default meta;

type Story = StoryObj<ViewSwitcherPropsAndCustomArgs>;

export const Default: Story = {
  args: {
    isCondensed: false,
    defaultSelected: 'Button 3',
    iconViewSwitcherButton1: DEFAULT_BUTTON_ICON,
    iconOnlyButton1: false,
    isDisabledButton1: false,
    iconViewSwitcherButton2: DEFAULT_BUTTON_ICON,
    iconOnlyButton2: false,
    isDisabledButton2: false,
    iconViewSwitcherButton3: DEFAULT_BUTTON_ICON,
    iconOnlyButton3: false,
    isDisabledButton3: false,
    iconViewSwitcherButton4: DEFAULT_BUTTON_ICON,
    iconOnlyButton4: false,
    isDisabledButton4: false,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    defaultSelected: {
      table: {
        disable: true,
      },
    },
    iconViewSwitcherButton1: iconArgType,
    iconViewSwitcherButton2: iconArgType,
    iconViewSwitcherButton3: iconArgType,
    iconViewSwitcherButton4: iconArgType,
  },
  render: (args) => (
    <ViewSwitcher.Group {...args}>
      {[...Array(BUTTONS_COUNT).keys()].map((index) => {
        const i = index + 1;

        return (
          <ViewSwitcher.Button
            key={i}
            label={`View ${i}`}
            isDisabled={
              args[
                `isDisabledButton${i}` as keyof typeof args
              ] as TViewSwitcherButtonProps['isDisabled']
            }
            value={`Button ${i}`}
            icon={
              args[
                `iconViewSwitcherButton${i}` as keyof typeof args
              ] as TViewSwitcherButtonProps['icon']
            }
          >
            {!args[`iconOnlyButton${i}` as keyof typeof args]
              ? `View ${i}`
              : undefined}
          </ViewSwitcher.Button>
        );
      })}
    </ViewSwitcher.Group>
  ),
};

export const WithoutIcons: Story = {
  args: {
    isCondensed: false,
    defaultSelected: 'Button 3',
    isDisabledButton1: false,
    isDisabledButton2: false,
    isDisabledButton3: false,
    isDisabledButton4: false,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    defaultSelected: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <ViewSwitcher.Group {...args}>
      {[...Array(BUTTONS_COUNT).keys()].map((index) => {
        const i = index + 1;

        return (
          <ViewSwitcher.Button
            key={i}
            label={`View ${i}`}
            isDisabled={
              args[
                `isDisabledButton${i}` as keyof typeof args
              ] as TViewSwitcherButtonProps['isDisabled']
            }
            value={`Button ${i}`}
          >
            {`View ${i}`}
          </ViewSwitcher.Button>
        );
      })}
    </ViewSwitcher.Group>
  ),
};
