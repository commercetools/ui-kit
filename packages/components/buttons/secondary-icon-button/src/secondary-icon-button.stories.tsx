import type { Meta, StoryObj } from '@storybook/react-vite';
import SecondaryIconButton from './secondary-icon-button';
import { InformationIcon } from '@commercetools-uikit/icons';
import { iconArgType, VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof SecondaryIconButton> = {
  title: 'components/Buttons/SecondaryIconButton',
  component: SecondaryIconButton,
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

type Story = StoryObj<typeof SecondaryIconButton>;

export const BasicExample: Story = {
  args: {
    icon: 'AngleDownIcon',
    label: 'Descriptive mandatory label',
  },
};

export const AllVariants: StoryObj = {
  tags: ['vrt'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="regular">
        <SecondaryIconButton
          icon={<InformationIcon />}
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="disabled">
        <SecondaryIconButton
          icon={<InformationIcon />}
          label="A label text"
          onClick={() => {}}
          isDisabled={true}
        />
      </VisualSpec>

      <VisualSpec label="color - solid">
        <SecondaryIconButton
          icon={<InformationIcon />}
          label="A label text"
          onClick={() => {}}
          color="solid"
        />
      </VisualSpec>

      <VisualSpec label="color - primary">
        <SecondaryIconButton
          icon={<InformationIcon />}
          label="A label text"
          onClick={() => {}}
          color="primary"
        />
      </VisualSpec>

      <VisualSpec label="color - info">
        <SecondaryIconButton
          icon={<InformationIcon />}
          label="A label text"
          onClick={() => {}}
          color="info"
        />
      </VisualSpec>

      <VisualSpec label="with small Icon">
        <SecondaryIconButton
          icon={<InformationIcon size="small" />}
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="sizes when small">
        <SecondaryIconButton
          icon={<InformationIcon />}
          size="small"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="sizes when medium">
        <SecondaryIconButton
          icon={<InformationIcon />}
          size="medium"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="sizes when big">
        <SecondaryIconButton
          icon={<InformationIcon />}
          size="big"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="size when 10">
        <SecondaryIconButton
          icon={<InformationIcon />}
          size="10"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="size when 20">
        <SecondaryIconButton
          icon={<InformationIcon />}
          size="20"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="size when 30">
        <SecondaryIconButton
          icon={<InformationIcon />}
          size="30"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>

      <VisualSpec label="size when 40 (default)">
        <SecondaryIconButton
          icon={<InformationIcon />}
          size="40"
          label="A label text"
          onClick={() => {}}
        />
      </VisualSpec>
    </>
  ),
};
