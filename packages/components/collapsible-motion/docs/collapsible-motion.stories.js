import React from 'react';
import Spacings from '@commercetools-uikit/spacings';
import { CollapsibleMotion } from '../src';

export default {
  title: 'Components/Collapsibles/CollapsibleMotion',
  component: CollapsibleMotion,
  argTypes: {
    height: { control: 'number' },
  },
};

const Template = ({ height, ...args }) => {
  const [isClosed, setIsClosed] = React.useState(false);
  const handleToggle = React.useCallback(
    () => setIsClosed((prevState) => !prevState),
    []
  );
  return (
    <Spacings.Inline>
      <div>
        <h2>Uncontrolled example</h2>
        <div>
          <div>Some content before</div>
          <CollapsibleMotion {...args}>
            {({ isOpen, toggle, containerStyles, registerContentNode }) => (
              <div>
                <div>
                  <button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</button>
                </div>
                <div style={containerStyles}>
                  <div ref={registerContentNode}>
                    <div
                      style={{
                        backgroundColor: 'red',
                        width: '200px',
                        height: `${height}px`,
                      }}
                    >
                      hello
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CollapsibleMotion>
          <div>Some content afterwards</div>
        </div>
      </div>
      <div>
        <h2>Controlled example</h2>
        <button onClick={() => setIsClosed(false)}>Open</button>
        <button onClick={() => setIsClosed(true)}>Close</button>
        <div>
          <div>Some content before</div>
          <CollapsibleMotion
            {...args}
            isClosed={isClosed}
            onToggle={handleToggle}
          >
            {({ toggle, containerStyles, registerContentNode }) => (
              <div>
                <div>
                  <button onClick={toggle}>Toggle</button>
                </div>
                <div style={containerStyles}>
                  <div ref={registerContentNode}>
                    <div
                      style={{
                        backgroundColor: 'red',
                        width: '200px',
                        height: `${height}px`,
                      }}
                    >
                      hello
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CollapsibleMotion>
          <div>Some content afterwards</div>
        </div>
      </div>
    </Spacings.Inline>
  );
};

export const Default = Template.bind({});
Default.args = {};
