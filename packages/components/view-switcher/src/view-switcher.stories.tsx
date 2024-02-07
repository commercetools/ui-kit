import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { iconArgType, categorize, hideControls } from '@/storybook-helpers';
import ViewSwitcher, { type TViewSwitcherProps } from '.';

const BASE_CATEGORY = 'View Switcher Button';
const BUTTONS_COUNT = 4;
const DEFAULT_BUTTON_ICON = 'WorldIcon';

type StoryAttributeName =
  | `iconViewSwitcherButton${number}`
  | `iconOnlyButton${number}`
  | `isDisabledButton${number}`;
type StoryAttributes = {
  [K in StoryAttributeName]: K extends `iconViewSwitcherButton${number}`
    ? string
    : boolean;
};
type ViewSwitcherPropsAndCustomArgs = TViewSwitcherProps &
  StoryAttributes & {
    children: (index: number) => string;
  };

const meta = {
  title: 'Components/ViewSwitcher',
  component: ViewSwitcher.Group,
  args: {
    isCondensed: false,
    defaultSelected: 'Button 2',
    iconOnlyButton1: false,
    isDisabledButton1: false,
    iconOnlyButton2: false,
    isDisabledButton2: false,
    iconOnlyButton3: false,
    isDisabledButton3: false,
    iconOnlyButton4: false,
    isDisabledButton4: true,
  },
  argTypes: {
    ...hideControls('defaultSelected'),
    iconViewSwitcherButton1: {
      ...iconArgType,
      ...categorize(BASE_CATEGORY, 1),
    },
    iconOnlyButton1: categorize(BASE_CATEGORY, 1),
    isDisabledButton1: categorize(BASE_CATEGORY, 1),
    iconViewSwitcherButton2: {
      ...iconArgType,
      ...categorize(BASE_CATEGORY, 2),
    },
    iconOnlyButton2: categorize(BASE_CATEGORY, 2),
    isDisabledButton2: categorize(BASE_CATEGORY, 2),
    iconViewSwitcherButton3: {
      ...iconArgType,
      ...categorize(BASE_CATEGORY, 3),
    },
    iconOnlyButton3: categorize(BASE_CATEGORY, 3),
    isDisabledButton3: categorize(BASE_CATEGORY, 3),
    iconViewSwitcherButton4: {
      ...iconArgType,
      ...categorize(BASE_CATEGORY, 4),
    },
    iconOnlyButton4: categorize(BASE_CATEGORY, 4),
    isDisabledButton4: categorize(BASE_CATEGORY, 4),
  },
} satisfies Meta<ViewSwitcherPropsAndCustomArgs>;

export default meta;

type Story = StoryObj<ViewSwitcherPropsAndCustomArgs>;

const ViewSwitcherStoryWrapper = (props: ViewSwitcherPropsAndCustomArgs) => (
  <ViewSwitcher.Group {...props}>
    {[...Array(BUTTONS_COUNT).keys()].map((index) => {
      const i = index + 1;
      return (
        <ViewSwitcher.Button
          key={i}
          label={`View ${i}`}
          isDisabled={props[`isDisabledButton${i}`]}
          value={`Button ${i}`}
          icon={props[`iconViewSwitcherButton${i}`] as unknown as ReactElement}
        >
          {!props[`iconOnlyButton${i}`] ? `View ${index + 1}` : undefined}
        </ViewSwitcher.Button>
      );
    })}
  </ViewSwitcher.Group>
);

export const Default: Story = {
  args: {
    iconViewSwitcherButton1: DEFAULT_BUTTON_ICON,
    iconOnlyButton1: false,
    iconViewSwitcherButton2: DEFAULT_BUTTON_ICON,
    iconOnlyButton2: false,
    iconViewSwitcherButton3: DEFAULT_BUTTON_ICON,
    iconOnlyButton3: false,
    iconViewSwitcherButton4: DEFAULT_BUTTON_ICON,
    iconOnlyButton4: false,
  },
  render: (args) => {
    return (
      <ViewSwitcherStoryWrapper {...args}>
        {(index) => `View ${index}`}
      </ViewSwitcherStoryWrapper>
    );
  },
};

export const WithoutIcons: Story = {
  render: ViewSwitcherStoryWrapper,
};

export const OnlyIcons: Story = {
  args: {
    iconViewSwitcherButton1: DEFAULT_BUTTON_ICON,
    iconOnlyButton1: true,
    iconViewSwitcherButton2: DEFAULT_BUTTON_ICON,
    iconOnlyButton2: true,
    iconViewSwitcherButton3: DEFAULT_BUTTON_ICON,
    iconOnlyButton3: true,
    iconViewSwitcherButton4: DEFAULT_BUTTON_ICON,
    iconOnlyButton4: true,
  },
  render: ViewSwitcherStoryWrapper,
};
