import type { Meta, StoryObj } from '@storybook/react-vite';
import FlatButton from './flat-button';
import { InformationIcon } from '@commercetools-uikit/icons';
import { iconArgType, VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof FlatButton> = {
  title: 'components/Buttons/FlatButton',
  component: FlatButton,
  argTypes: {
    icon: iconArgType,
    as: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof FlatButton>;

export const BasicExample: Story = {
  args: {
    tone: 'primary',
    label: 'A label text',
    onClick: () => alert('Button clicked'),
    isDisabled: false,
  },
};

export const AllVariants: StoryObj = {
  tags: ['vrt'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="regular">
        <FlatButton tone="primary" label="A label text" onClick={() => {}} />
      </VisualSpec>

      <VisualSpec label="disabled">
        <FlatButton
          tone="primary"
          label="A label text"
          onClick={() => {}}
          isDisabled={true}
        />
      </VisualSpec>

      <VisualSpec label="with icon left (default)">
        <FlatButton
          tone="primary"
          label="A label text"
          onClick={() => {}}
          icon={<InformationIcon />}
        />
      </VisualSpec>

      <VisualSpec label="with icon right">
        <FlatButton
          tone="primary"
          label="A label text"
          onClick={() => {}}
          icon={<InformationIcon />}
          iconPosition="right"
        />
      </VisualSpec>

      <VisualSpec label="secondary">
        <FlatButton
          tone="secondary"
          label="A label text"
          onClick={() => {}}
          icon={<InformationIcon />}
        />
      </VisualSpec>

      <VisualSpec label="critical">
        <FlatButton
          tone="critical"
          label="A label text"
          onClick={() => {}}
          icon={<InformationIcon />}
        />
      </VisualSpec>

      <VisualSpec label="inverted" backgroundColor="black">
        <FlatButton
          tone="inverted"
          label="A label text"
          onClick={() => {}}
          icon={<InformationIcon />}
        />
      </VisualSpec>

      <VisualSpec label="as anchor, with a multiline text and icon left">
        <div style={{ width: 150 }}>
          <FlatButton
            tone="primary"
            label="A label for an anchor which is pretty looooong and doesn't fit its container without breaking"
            onClick={() => {}}
            icon={<InformationIcon />}
            as="a"
          />
        </div>
      </VisualSpec>

      <VisualSpec label="as anchor, with a multiline text and icon right">
        <div style={{ width: 150 }}>
          <FlatButton
            tone="primary"
            label="A label for an anchor which is pretty looooong and doesn't fit its container without breaking"
            onClick={() => {}}
            icon={<InformationIcon />}
            iconPosition="right"
            as="a"
          />
        </div>
      </VisualSpec>
    </>
  ),
};
