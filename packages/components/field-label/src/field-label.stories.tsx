import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconArgType } from '@/storybook-helpers';
import FieldLabel from './field-label';
import FlatButton from '@commercetools-uikit/flat-button';
import { BoxIcon, WarningIcon } from '@commercetools-uikit/icons';
import styled from '@emotion/styled';
import { VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof FieldLabel> = {
  title: 'Form/Fields/Field__/FieldLabel',
  // @ts-ignore
  component: FieldLabel,
  argTypes: {
    hintIcon: iconArgType,
    title: { control: { type: 'text' } },
    hint: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    badge: {
      control: { disable: true },
    },
  },
};
export default meta;

type Story = StoryObj<typeof FieldLabel>;

export const BasicExample: Story = {
  args: {
    horizontalConstraint: 'scale',
    title: 'Sort Order',
    hasRequiredIndicator: false,
    hint: 'Enter a number between 0 and 1',
    /** @ts-ignore */
    hintIcon: 'SortingIcon',
    description: 'This order will be used to sort the categories.',
    badge: (
      <FlatButton
        tone="primary"
        icon={<BoxIcon />}
        label="I'm used as badge"
        onClick={() => {}}
      />
    ),
  },
};

const BorderedBox = styled.div`
  border: 1px solid red;
`;
const NonRenderingComponent = () => null;

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <FieldLabel title="Hello" horizontalConstraint={7} />
      </VisualSpec>
      <VisualSpec label="with hint and hint icon">
        <FieldLabel
          title="Hello"
          hint="a hint"
          hintIcon={<WarningIcon />}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="with required indicator">
        <FieldLabel
          title="Hello"
          hasRequiredIndicator={true}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="with required indicator and ReactNode as title">
        <FieldLabel
          title={<div>Hello</div>}
          hasRequiredIndicator={true}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="with all options">
        <FieldLabel
          title="Hello"
          hasRequiredIndicator={true}
          onInfoButtonClick={() => {}}
          hint="a hint"
          hintIcon={<WarningIcon />}
          description="description"
          badge={<FlatButton tone="primary" label="show" />}
          htmlFor="sampleInput"
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="with all options and large horizontal constraint">
        <FieldLabel
          title="Hello"
          hasRequiredIndicator={true}
          onInfoButtonClick={() => {}}
          hint="a hint"
          hintIcon={<WarningIcon />}
          description="description"
          badge={<FlatButton tone="primary" label="show" />}
          htmlFor="sampleInput"
          horizontalConstraint={10}
        />
      </VisualSpec>
      <VisualSpec label="with a very long hint">
        <FieldLabel
          title="Hello"
          hint="Sed vel condimentum lacus. Nam sit amet dui et magna tincidunt faucibus. Praesent gravida tempor semper. Donec et faucibus ante. Maecenas consectetur urna mi."
          hintIcon={<WarningIcon />}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="with inverted tone" backgroundColor="black">
        <FieldLabel
          title="Hello"
          description="description"
          hasRequiredIndicator={true}
          tone="inverted"
        />
      </VisualSpec>
      <VisualSpec label="with react component description which renders nothing">
        <BorderedBox>
          <FieldLabel title="Hello" description={<NonRenderingComponent />} />
        </BorderedBox>
      </VisualSpec>
    </>
  ),
};
