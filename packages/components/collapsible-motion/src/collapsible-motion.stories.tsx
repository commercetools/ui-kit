import { useState, type ComponentProps } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import CollapsibleMotion from './collapsible-motion';
import PrimaryButton from '@commercetools-uikit/primary-button';

type CollapsibleMotionProps = ComponentProps<typeof CollapsibleMotion>;

const meta: Meta<CollapsibleMotionProps> = {
  title: 'components/Panels/CollapsibleMotion',
  component: CollapsibleMotion,
};
export default meta;

export const BasicExample: StoryFn<CollapsibleMotionProps> = (args) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div style={{ height: 640 }}>
      <div style={{ display: 'flex', marginBottom: '4em' }}>
        <div style={{ width: 200, marginRight: '2em', flexShrink: 0 }}>
          <h1>Uncontrolled Example</h1>
          <br />
          <p>
            <code>{`<CollapsibleMotion/>`}</code> is taking care of its
            open/closed-state.
          </p>
        </div>
        <div>
          <CollapsibleMotion {...args}>
            {({ isOpen, toggle, containerStyles, registerContentNode }) => (
              <div>
                <PrimaryButton
                  data-testid="button"
                  onClick={toggle}
                  label={isOpen ? 'Close' : 'Open'}
                />

                <hr />
                <div data-testid="container-node" style={containerStyles}>
                  <div data-testid="content-node" ref={registerContentNode}>
                    <h2>CollapsibleMotion</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed ac purus eget justo aliquam suscipit. Nullam nec metus
                      vestibulum, vehicula mi nec, ultricies sapien. Donec
                      sollicitudin, metus et lacinia tincidunt, ante neque
                      cursus lorem, nec varius nunc nunc id turpis. Sed auctor,
                      eros at lacinia lacinia, erat felis ultricies magna, nec
                      suscipit libero purus vel purus. Nullam in nunc nec nunc
                      ultricies dictum. Sed nec lacinia mi. Nullam ac nunc nec
                      nunc sollicitudin.
                    </p>
                  </div>
                </div>
                <hr />
                <div>
                  I am content that is displayed below the collapsible stuff.
                </div>
              </div>
            )}
          </CollapsibleMotion>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ width: 200, marginRight: '2em', flexShrink: 0 }}>
          <h1>Controlled Example</h1>
          <br />
          <p>
            <code>{`<CollapsibleMotion/>`}</code>
            {`'s`} closed state is controlled via the <code>isClosed</code>{' '}
            property.
          </p>
          <br />
          <p>
            <PrimaryButton
              data-testid="button"
              onClick={() => setOpen(!open)}
              label={open ? 'Close' : 'Open'}
            />
          </p>
        </div>
        <div>
          <CollapsibleMotion isClosed={!open}>
            {({ containerStyles, registerContentNode }) => (
              <div>
                <div data-testid="container-node" style={containerStyles}>
                  <div data-testid="content-node" ref={registerContentNode}>
                    <h2>CollapsibleMotion</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed ac purus eget justo aliquam suscipit. Nullam nec metus
                      vestibulum, vehicula mi nec, ultricies sapien. Donec
                      sollicitudin, metus et lacinia tincidunt, ante neque
                      cursus lorem, nec varius nunc nunc id turpis. Sed auctor,
                      eros at lacinia lacinia, erat felis ultricies magna, nec
                      suscipit libero purus vel purus. Nullam in nunc nec nunc
                      ultricies dictum. Sed nec lacinia mi. Nullam ac nunc nec
                      nunc sollicitudin.
                    </p>
                  </div>
                </div>
                <hr />
                <div>
                  I am content that is displayed below the collapsible stuff.
                </div>
              </div>
            )}
          </CollapsibleMotion>
        </div>
      </div>
      <hr />
    </div>
  );
};
