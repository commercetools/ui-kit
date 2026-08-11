import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchTextInput from './search-text-input';
import { VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof SearchTextInput> = {
  title: 'Form/Inputs/SearchTextInput',
  // @ts-ignore, sb seems unable to deal with this complex type (forwardedRef & partial)
  component: SearchTextInput,
};
export default meta;

type Story = StoryObj<typeof SearchTextInput>;

export const BasicExample: Story = {
  args: {
    // @ts-ignore
    placeholder: 'Placeholder text',
  },
};

const value = 'hello world how are you?';

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <SearchTextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          onSubmit={() => {}}
          onReset={() => {}}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <SearchTextInput
          isDisabled={true}
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          onSubmit={() => {}}
          onReset={() => {}}
        />
      </VisualSpec>
      <VisualSpec label="when read-only">
        <SearchTextInput
          isReadOnly={true}
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          onSubmit={() => {}}
          onReset={() => {}}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is visible">
        <SearchTextInput
          value=""
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={7}
          onSubmit={() => {}}
          onReset={() => {}}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is visible and input is disabled">
        <SearchTextInput
          isDisabled={true}
          value=""
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={7}
          onSubmit={() => {}}
          onReset={() => {}}
        />
      </VisualSpec>
      <VisualSpec label="with error">
        <SearchTextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          onSubmit={() => {}}
          onReset={() => {}}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning">
        <SearchTextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          onSubmit={() => {}}
          onReset={() => {}}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="with error and warning">
        <SearchTextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          onSubmit={() => {}}
          onReset={() => {}}
          hasError={true}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled with error">
        <SearchTextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          onSubmit={() => {}}
          onReset={() => {}}
          isDisabled={true}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled with warning">
        <SearchTextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          onSubmit={() => {}}
          onReset={() => {}}
          isDisabled={true}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="with isCondensed">
        <SearchTextInput
          value={value}
          onChange={() => {}}
          isCondensed={true}
          horizontalConstraint={7}
          onSubmit={() => {}}
          onReset={() => {}}
        />
      </VisualSpec>
    </>
  ),
};
