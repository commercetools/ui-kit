import type { Meta, StoryObj } from '@storybook/react';
import CustomIcon from './custom-icon';
import CustomReactSvg from './../fixtures/CustomIconReact';

const meta: Meta<typeof CustomIcon> = {
  title: 'Text & Media/Icons/CustomIcon',
  component: CustomIcon,
  argTypes: {
    icon: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof CustomIcon>;

/**
 * This component is meant to be used whenever consumers need to render an icon which is not part of the ui-kit icon set.
 *
 * In order to keep visual consistency, we want to keep the available sizes of all icons equal. Bear in mind we would expect custom SVG icons to not contain size attributes so it can be controlled based on the components size attribute.
 */
export const BasicExample: Story = {
  args: {
    icon: <CustomReactSvg />,
  },
};
