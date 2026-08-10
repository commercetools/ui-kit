import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoIcon } from '@commercetools-uikit/icons';
import MultilineTextInput from './multiline-text-input';
import { iconArgType, VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof MultilineTextInput> = {
  title: 'Form/Inputs/MultilineTextInput',
  component: MultilineTextInput,
  argTypes: {
    rightActionIcon: iconArgType,
  },
};
export default meta;

type Story = StoryObj<typeof MultilineTextInput>;

export const BasicExample: Story = {
  args: {
    placeholder: 'Placeholder text',
  },
};

const value =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <MultilineTextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <MultilineTextInput
          isDisabled={true}
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when read-only">
        <MultilineTextInput
          isReadOnly={true}
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is visible">
        <MultilineTextInput
          value=""
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is visible and input is disabled">
        <MultilineTextInput
          isDisabled={true}
          value=""
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="with error">
        <MultilineTextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning">
        <MultilineTextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="with error and warning">
        <MultilineTextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hasError={true}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="with right action">
        <MultilineTextInput
          value={value}
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={7}
          rightActionIcon={<InfoIcon />}
          rightActionProps={{
            label: 'Click me',
            onClick: () => {},
          }}
        />
      </VisualSpec>
      <VisualSpec label="with isCondensed">
        <MultilineTextInput
          value={value}
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={7}
          isCondensed={true}
        />
      </VisualSpec>
      <VisualSpec label="with right action and isCondensed">
        <MultilineTextInput
          value={value}
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={7}
          rightActionIcon={<InfoIcon />}
          isCondensed={true}
          rightActionProps={{
            label: 'Click me',
            onClick: () => {},
          }}
        />
      </VisualSpec>
      <VisualSpec label="with max rows">
        <MultilineTextInput
          value={value}
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={7}
          maxRows={3}
          rightActionIcon={<InfoIcon />}
          rightActionProps={{
            label: 'Click me',
            onClick: () => {},
          }}
        />
      </VisualSpec>
    </>
  ),
};
