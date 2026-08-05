import type { Meta, StoryObj } from '@storybook/react-vite';
import IconButton from './icon-button';
import { iconArgType, VisualSpec } from '@/storybook-helpers';
import { InformationIcon } from '@commercetools-uikit/icons';

const meta: Meta<typeof IconButton> = {
  title: 'components/Buttons/IconButton',
  component: IconButton,
  argTypes: {
    as: {
      control: 'text',
    },
    icon: iconArgType,
    size: {
      control: 'select',
      options: ['10', '20', '30', '40'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const BasicExample: Story = {
  args: {
    icon: <InformationIcon />,
    label: 'A mandatory label for screenreaders',
    onClick: () => alert('Button clicked'),
  },
};

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="regular">
        <IconButton
          icon={<InformationIcon />}
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="disabled">
        <IconButton
          icon={<InformationIcon />}
          label="A label text"
          onClick={() => {}}
          isDisabled={true}
        />
      </VisualSpec>

      <VisualSpec label="when toggled">
        <IconButton
          icon={<InformationIcon />}
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
          isToggled={true}
        />
      </VisualSpec>

      <VisualSpec label="when not toggled">
        <IconButton
          icon={<InformationIcon />}
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
        />
      </VisualSpec>

      <VisualSpec label="shapes - when round (default)">
        <IconButton
          icon={<InformationIcon />}
          shape="round"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="shapes - when square">
        <IconButton
          icon={<InformationIcon />}
          shape="square"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="sizes - when round - when small">
        <IconButton
          icon={<InformationIcon />}
          size="small"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="sizes - when round - when medium">
        <IconButton
          icon={<InformationIcon />}
          size="medium"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="sizes - when round - when big (default)">
        <IconButton
          icon={<InformationIcon />}
          size="big"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="sizes - when square - when small">
        <IconButton
          icon={<InformationIcon />}
          shape="square"
          size="small"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="sizes - when square - when medium">
        <IconButton
          icon={<InformationIcon />}
          shape="square"
          size="medium"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="sizes - when square - when big (default)">
        <IconButton
          icon={<InformationIcon />}
          shape="square"
          size="big"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="theme - when default">
        <IconButton
          icon={<InformationIcon />}
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
          theme="default"
        />
      </VisualSpec>

      <VisualSpec label="theme - when primary - when toggled">
        <IconButton
          icon={<InformationIcon />}
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
          isToggled={true}
          theme="primary"
        />
      </VisualSpec>

      <VisualSpec label="theme - when info - when toggled">
        <IconButton
          icon={<InformationIcon />}
          label="A label text"
          onClick={() => {}}
          isToggleButton={true}
          isToggled={true}
          theme="info"
        />
      </VisualSpec>

      <VisualSpec label="sizes - when '10'">
        <IconButton
          icon={<InformationIcon />}
          shape="square"
          size="10"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="sizes - when '20'">
        <IconButton
          icon={<InformationIcon />}
          shape="square"
          size="20"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="sizes - when '30'">
        <IconButton
          icon={<InformationIcon />}
          shape="square"
          size="30"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="sizes - when '40'">
        <IconButton
          icon={<InformationIcon />}
          shape="square"
          size="40"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="primary icon-button">
        <IconButton
          icon={<InformationIcon />}
          onClick={() => {}}
          size="40"
          theme="primary"
          label="primary icon-button demo"
        />
      </VisualSpec>

      <VisualSpec label="info icon-button">
        <IconButton
          icon={<InformationIcon />}
          onClick={() => {}}
          size="40"
          theme="info"
          label="info icon-button demo"
        />
      </VisualSpec>
    </>
  ),
};
