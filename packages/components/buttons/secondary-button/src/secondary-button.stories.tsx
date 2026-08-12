import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import SecondaryButton from './secondary-button';
import { InformationIcon } from '@commercetools-uikit/icons';
import { iconArgType, VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof SecondaryButton> = {
  title: 'components/Buttons/SecondaryButton',
  component: SecondaryButton,
  argTypes: {
    iconLeft: iconArgType,
    iconRight: iconArgType,
    as: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['10', '20'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof SecondaryButton>;

export const BasicExample: Story = {
  args: {
    label: 'Button Label Text',
    iconLeft: 'AngleDownIcon',
  },
};

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
  render: () => (
    <>
      <VisualSpec label="regular">
        <SecondaryButton label="A label text" onClick={() => {}} />
      </VisualSpec>

      <VisualSpec label="disabled">
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          isDisabled={true}
        />
      </VisualSpec>

      <VisualSpec label="with icon left (default)">
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          iconLeft={<InformationIcon />}
        />
      </VisualSpec>

      <VisualSpec label="as toggle button - when not toggled">
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
        />
      </VisualSpec>

      <VisualSpec label="as toggle button - when toggled">
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
          isToggled={true}
        />
      </VisualSpec>

      {/* The label names tone="default", which is not a valid tone and always
          fell through to the secondary styles. Omitted, not renamed. */}
      <VisualSpec label='with theme - when toggled with tone "default"'>
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
          isToggled={true}
        />
      </VisualSpec>

      <VisualSpec label='with theme - when toggled with tone "info"'>
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
          isToggled={true}
          tone="info"
        />
      </VisualSpec>

      <VisualSpec label='with theme - when not toggled with tone "default"'>
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
          isToggled={false}
        />
      </VisualSpec>

      <VisualSpec label='with theme - when not toggled with tone "info"'>
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
          isToggled={false}
          tone="info"
        />
      </VisualSpec>

      <VisualSpec label='size - when "big"'>
        <SecondaryButton label="A label text" onClick={() => {}} size="big" />
      </VisualSpec>

      <VisualSpec label='size - when "medium"'>
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          size="medium"
        />
      </VisualSpec>

      <VisualSpec label='size - when "20"'>
        <SecondaryButton label="A label text" onClick={() => {}} size="20" />
      </VisualSpec>

      <VisualSpec label='size - when "10"'>
        <SecondaryButton label="A label text" onClick={() => {}} size="10" />
      </VisualSpec>

      <VisualSpec label="when used as link">
        <SecondaryButton as={Link} label="A label text" to="/" />
      </VisualSpec>

      <VisualSpec label='when tone is "info"'>
        <SecondaryButton label="A label text" onClick={() => {}} tone="info" />
      </VisualSpec>

      <VisualSpec label="with icon right">
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          iconRight={<InformationIcon />}
        />
      </VisualSpec>

      <VisualSpec label="with icon left + right">
        <SecondaryButton
          label="A label text"
          onClick={() => {}}
          iconLeft={<InformationIcon />}
          iconRight={<InformationIcon />}
        />
      </VisualSpec>
    </>
  ),
};
