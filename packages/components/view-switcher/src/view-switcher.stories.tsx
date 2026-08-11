import type { Meta, StoryObj } from '@storybook/react-vite';
import ViewSwitcher from './index';
import {
  WorldIcon,
  CubeIcon,
  InformationIcon,
} from '@commercetools-uikit/icons';
import { VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof ViewSwitcher.Group> = {
  title: 'components/ViewSwitcher',
  component: ViewSwitcher.Group,
  subcomponents: {
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

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="with a button selected">
        <ViewSwitcher.Group defaultSelected="view-1">
          <ViewSwitcher.Button value="view-1">View 1</ViewSwitcher.Button>
          <ViewSwitcher.Button value="view-2">View 2</ViewSwitcher.Button>
          <ViewSwitcher.Button value="view-3">View 3</ViewSwitcher.Button>
        </ViewSwitcher.Group>
      </VisualSpec>
      <VisualSpec label="with a button disabled and a button selected">
        <ViewSwitcher.Group defaultSelected="view-2">
          <ViewSwitcher.Button value="view-1" isDisabled>
            View 1
          </ViewSwitcher.Button>
          <ViewSwitcher.Button value="view-2">View 2</ViewSwitcher.Button>
          <ViewSwitcher.Button value="view-3">View 3</ViewSwitcher.Button>
        </ViewSwitcher.Group>
      </VisualSpec>
      <VisualSpec label="with condensed version">
        <ViewSwitcher.Group defaultSelected="view-1" isCondensed>
          <ViewSwitcher.Button value="view-1">View 1</ViewSwitcher.Button>
          <ViewSwitcher.Button value="view-2">View 2</ViewSwitcher.Button>
          <ViewSwitcher.Button value="view-3">View 3</ViewSwitcher.Button>
        </ViewSwitcher.Group>
      </VisualSpec>
      <VisualSpec label="with icon only buttons">
        <ViewSwitcher.Group defaultSelected="view-1">
          <ViewSwitcher.Button value="view-1" icon={<InformationIcon />} />
          <ViewSwitcher.Button value="view-2" icon={<CubeIcon />} />
          <ViewSwitcher.Button value="view-3" icon={<WorldIcon />} />
        </ViewSwitcher.Group>
      </VisualSpec>
      <VisualSpec label="with icon and text buttons">
        <ViewSwitcher.Group defaultSelected="view-1">
          <ViewSwitcher.Button value="view-1" icon={<InformationIcon />}>
            View 1
          </ViewSwitcher.Button>
          <ViewSwitcher.Button value="view-2" icon={<CubeIcon />}>
            View 2
          </ViewSwitcher.Button>
          <ViewSwitcher.Button value="view-3" icon={<WorldIcon />}>
            View 3
          </ViewSwitcher.Button>
        </ViewSwitcher.Group>
      </VisualSpec>
      <VisualSpec label="with icon buttons and condensed version">
        <ViewSwitcher.Group defaultSelected="view-1" isCondensed>
          <ViewSwitcher.Button value="view-1" icon={<InformationIcon />}>
            View 1
          </ViewSwitcher.Button>
          <ViewSwitcher.Button value="view-2" icon={<CubeIcon />}>
            View 2
          </ViewSwitcher.Button>
          <ViewSwitcher.Button value="view-3" icon={<WorldIcon />}>
            View 3
          </ViewSwitcher.Button>
        </ViewSwitcher.Group>
      </VisualSpec>
      <VisualSpec label="with icon buttons, condensed version and a disabled button">
        <ViewSwitcher.Group defaultSelected="view-1" isCondensed>
          <ViewSwitcher.Button value="view-1" icon={<InformationIcon />}>
            View 1
          </ViewSwitcher.Button>
          <ViewSwitcher.Button value="view-2" isDisabled icon={<CubeIcon />}>
            View 2
          </ViewSwitcher.Button>
          <ViewSwitcher.Button value="view-3" icon={<WorldIcon />}>
            View 3
          </ViewSwitcher.Button>
        </ViewSwitcher.Group>
      </VisualSpec>
    </>
  ),
};
