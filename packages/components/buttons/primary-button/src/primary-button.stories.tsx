import type { Meta, StoryObj } from '@storybook/react-vite';
import PrimaryButton from './primary-button';
import { InformationIcon } from '@commercetools-uikit/icons';
import { iconArgType, VisualSpec, VisualSpecGroup } from '@/storybook-helpers';

const meta: Meta<typeof PrimaryButton> = {
  title: 'components/Buttons/PrimaryButton',
  component: PrimaryButton,
  argTypes: {
    as: {
      control: 'text',
    },
    iconLeft: iconArgType,
    iconRight: iconArgType,
    size: {
      control: 'select',
      options: ['10', '20'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof PrimaryButton>;

export const BasicExample: Story = {
  args: {
    label: 'Button Label Text',
    iconLeft: 'AngleDownIcon',
  },
};

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpecGroup label="as `button` (default)">
        <VisualSpec label="regular">
          <PrimaryButton label="A label text" onClick={() => {}} />
        </VisualSpec>
        <VisualSpec label="disabled">
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            isDisabled={true}
          />
        </VisualSpec>
        <VisualSpec label="with icon left (default)">
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            iconLeft={<InformationIcon />}
          />
        </VisualSpec>
        <VisualSpec label="as toggle button - when not toggled">
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            isToggleButton={true}
          />
        </VisualSpec>
        <VisualSpec label="as toggle button - when toggled">
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            isToggleButton={true}
            isToggled={true}
          />
        </VisualSpec>
        <VisualSpec label='size - when "big"'>
          <PrimaryButton label="A label text" onClick={() => {}} size="big" />
        </VisualSpec>
        <VisualSpec label='size - when "medium"'>
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            size="medium"
          />
        </VisualSpec>
        <VisualSpec label='size - when "10"'>
          <PrimaryButton label="A label text" onClick={() => {}} size="10" />
        </VisualSpec>
        <VisualSpec label='size - when "20"'>
          <PrimaryButton label="A label text" onClick={() => {}} size="20" />
        </VisualSpec>
        <VisualSpec label='tone - when "urgent"'>
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            tone="urgent"
          />
        </VisualSpec>
        <VisualSpec label='tone - when "primary"'>
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            tone="primary"
          />
        </VisualSpec>
        <VisualSpec label='tone - when "critical"'>
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            tone="critical"
          />
        </VisualSpec>
        <VisualSpec label="as toggle button - when toggled and disabled">
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            isToggleButton={true}
            isToggled={true}
            isDisabled={true}
          />
        </VisualSpec>
        <VisualSpec label="as toggle button (urgent tone) - when not toggled">
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            tone="urgent"
            isToggleButton={true}
          />
        </VisualSpec>
        <VisualSpec label="as toggle button (urgent tone) - when toggled">
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            tone="urgent"
            isToggleButton={true}
            isToggled={true}
          />
        </VisualSpec>
        <VisualSpec label="as toggle button (urgent tone) - when toggled and disabled">
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            tone="urgent"
            isToggleButton={true}
            isToggled={true}
            isDisabled={true}
          />
        </VisualSpec>
        <VisualSpec label="as toggle button (critical tone) - when toggled and disabled">
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            tone="critical"
            isToggleButton={true}
            isToggled={true}
            isDisabled={true}
          />
        </VisualSpec>
        <VisualSpec label="with icon right">
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            iconRight={<InformationIcon />}
          />
        </VisualSpec>
        <VisualSpec label="with icons left + right">
          <PrimaryButton
            label="A label text"
            onClick={() => {}}
            iconLeft={<InformationIcon />}
            iconRight={<InformationIcon />}
          />
        </VisualSpec>
      </VisualSpecGroup>

      <VisualSpecGroup label="with `as` as Link">
        <VisualSpec label="regular">
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
          />
        </VisualSpec>
        <VisualSpec label="disabled">
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            isDisabled={true}
          />
        </VisualSpec>
        <VisualSpec label="with icon left (default)">
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            iconLeft={<InformationIcon />}
          />
        </VisualSpec>
        <VisualSpec label="as toggle button - when not toggled">
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            isToggleButton={true}
          />
        </VisualSpec>
        <VisualSpec label="as toggle button - when toggled">
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            isToggleButton={true}
            isToggled={true}
          />
        </VisualSpec>
        <VisualSpec label='size - when "big"'>
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            size="big"
          />
        </VisualSpec>
        <VisualSpec label='size - when "medium"'>
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            size="medium"
          />
        </VisualSpec>
        <VisualSpec label='size - when "10"'>
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            size="10"
          />
        </VisualSpec>
        <VisualSpec label='size - when "20"'>
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            size="20"
          />
        </VisualSpec>
        <VisualSpec label='tone - when "urgent"'>
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            tone="urgent"
          />
        </VisualSpec>
        <VisualSpec label='tone - when "primary"'>
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            tone="primary"
          />
        </VisualSpec>
        <VisualSpec label='tone - when "critical"'>
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            tone="critical"
          />
        </VisualSpec>
        <VisualSpec label="as toggle button - when toggled and disabled">
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            isToggleButton={true}
            isToggled={true}
            isDisabled={true}
          />
        </VisualSpec>
        <VisualSpec label="as toggle button (urgent tone) - when not toggled">
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            tone="urgent"
            isToggleButton={true}
          />
        </VisualSpec>
        <VisualSpec label="as toggle button (urgent tone) - when toggled">
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            tone="urgent"
            isToggleButton={true}
            isToggled={true}
          />
        </VisualSpec>
        <VisualSpec label="as toggle button (urgent tone) - when toggled and disabled">
          <PrimaryButton
            as="a"
            href="https://kanyetothe.com"
            label="A label text"
            onClick={() => {}}
            tone="urgent"
            isToggleButton={true}
            isToggled={true}
            isDisabled={true}
          />
        </VisualSpec>
      </VisualSpecGroup>
    </>
  ),
};
