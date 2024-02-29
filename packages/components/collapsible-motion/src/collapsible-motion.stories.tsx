import type { Meta, StoryObj } from '@storybook/react';
import Constraints from '@commercetools-uikit/constraints';

import CollapsibleMotion, {
  TCollapsibleMotionProps,
  type TNodeRefObject,
} from './collapsible-motion';
import { useState } from 'react';

type TPanelContentProps = {
  isOpen: boolean;
  toggle: () => void;
  containerStyles: React.CSSProperties;
  registerContentNode: TNodeRefObject;
};
function PanelContent(props: TPanelContentProps) {
  return (
    <div>
      <div>
        <button onClick={props.toggle}>Toggle</button>
      </div>
      <div style={props.containerStyles}>
        <div ref={props.registerContentNode}>
          <div
            style={{
              backgroundColor: 'red',
              width: '200px',
              height: '250px',
            }}
          >
            Here is the panel content
          </div>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: 'Components/Panels/CollapsibleMotion',
  component: CollapsibleMotion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: (options) => <PanelContent {...options} />,
  },
  decorators: [
    (Story) => (
      <Constraints.Horizontal max={10}>
        <Story />
      </Constraints.Horizontal>
    ),
  ],
} satisfies Meta<typeof CollapsibleMotion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

const ControlledCollapsibleMotion = (props: TCollapsibleMotionProps) => {
  const [isClosed, setIsClosed] = useState(false);
  const toggle = () => setIsClosed((prev) => !prev);
  return (
    <>
      <button onClick={() => setIsClosed(false)}>Open</button>
      <button onClick={() => setIsClosed(true)}>Close</button>
      <br />
      <br />
      <CollapsibleMotion {...props} isClosed={isClosed} onToggle={toggle} />
    </>
  );
};

export const Controlled: Story = {
  args: {},
  render: (args) => <ControlledCollapsibleMotion {...args} />,
};
